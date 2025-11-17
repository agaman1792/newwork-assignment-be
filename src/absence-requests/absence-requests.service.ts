import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbsenceRequest } from './absence-request.entity';
import { CreateAbsenceRequestDto } from './dto/create-absence-request.dto';
import { Employee } from '../employees/employee.entity';
@Injectable()
export class AbsenceRequestsService {
    constructor(
        @InjectRepository(AbsenceRequest)
        private absenceRequestRepository: Repository<AbsenceRequest>,
        @InjectRepository(Employee)
        private employeeRepository: Repository<Employee>,
    ) {}

    async create(
        profileId: string,
        createDto: CreateAbsenceRequestDto,
        user: Employee,
    ): Promise<AbsenceRequest> {
        const employee = await this.employeeRepository.findOne({
            where: { id: profileId },
        });
        if (!employee) {
            throw new NotFoundException('Employee profile not found');
        }

        const isOwner = employee.id === user.id;
        const isManager = user.roles.includes('MANAGER');
        const isAdmin = user.roles.includes('ADMIN');

        if (!isOwner && !isManager && !isAdmin) {
            throw new UnauthorizedException(
                'You are not authorized to create an absence request for this profile',
            );
        }

        const absenceRequest = this.absenceRequestRepository.create({
            ...createDto,
            profile_id: profileId,
            status: 'PENDING',
        });

        return this.absenceRequestRepository.save(absenceRequest);
    }

    async findAllForProfile(
        profileId: string,
        user: Employee,
    ): Promise<AbsenceRequest[]> {
        const employee = await this.employeeRepository.findOne({
            where: { id: profileId },
        });
        if (!employee) {
            throw new NotFoundException('Employee profile not found');
        }

        const isOwner = employee.id === user.id;
        const isManager = user.roles.includes('MANAGER');
        const isAdmin = user.roles.includes('ADMIN');

        if (isOwner) {
            return this.absenceRequestRepository.find({
                where: { profile_id: profileId },
            });
        }

        if (isManager || isAdmin) {
            return this.absenceRequestRepository.find({
                where: { profile_id: profileId },
            });
        }

        throw new UnauthorizedException(
            'You are not authorized to view these absence requests',
        );
    }

    async approve(id: string, user: Employee): Promise<AbsenceRequest> {
        const absenceRequest = await this.absenceRequestRepository.findOne({
            where: { id },
        });
        if (!absenceRequest) {
            throw new NotFoundException('Absence request not found');
        }

        absenceRequest.status = 'APPROVED';
        absenceRequest.approver_id = user.id;
        return this.absenceRequestRepository.save(absenceRequest);
    }

    async reject(id: string, user: Employee): Promise<AbsenceRequest> {
        const absenceRequest = await this.absenceRequestRepository.findOne({
            where: { id },
        });
        if (!absenceRequest) {
            throw new NotFoundException('Absence request not found');
        }

        absenceRequest.status = 'REJECTED';
        absenceRequest.approver_id = user.id;
        return this.absenceRequestRepository.save(absenceRequest);
    }

    async cancel(id: string, user: Employee): Promise<AbsenceRequest> {
        const absenceRequest = await this.absenceRequestRepository.findOne({
            where: { id },
            relations: ['profile'],
        });
        if (!absenceRequest) {
            throw new NotFoundException('Absence request not found');
        }

        if (absenceRequest.profile.id !== user.id) {
            throw new UnauthorizedException(
                'You can only cancel your own absence requests',
            );
        }

        if (absenceRequest.status !== 'APPROVED') {
            throw new UnauthorizedException(
                'You can only cancel an approved absence request',
            );
        }

        absenceRequest.status = 'CANCELLED';
        return this.absenceRequestRepository.save(absenceRequest);
    }
}
