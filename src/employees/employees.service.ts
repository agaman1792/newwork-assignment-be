import {
    Injectable,
    NotFoundException,
    ForbiddenException,
    ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import { CreateEmployeeProfileDto } from './dto/create-employee-profile.dto';
import { UpdateEmployeeProfileDto } from './dto/update-employee-profile.dto';
import { UpdateEmployeeRolesDto } from './dto/update-employee-roles.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/authz/user.interface';

@Injectable()
export class EmployeesService {
    constructor(
        @InjectRepository(Employee)
        private employeesRepository: Repository<Employee>,
    ) {}

    async create(
        createEmployeeProfileDto: CreateEmployeeProfileDto,
    ): Promise<Employee> {
        const { email, password, roles } = createEmployeeProfileDto;

        const existingEmployee = await this.employeesRepository.findOne({
            where: { email },
        });
        if (existingEmployee) {
            throw new ConflictException('Employee with this email already exists');
        }

        const password_hash = await bcrypt.hash(password, 10);

        const employee = this.employeesRepository.create({
            email,
            password_hash,
            roles: roles || 'EMPLOYEE',
        });

        return this.employeesRepository.save(employee);
    }

    async findAll(): Promise<Employee[]> {
        return this.employeesRepository.find();
    }

    async findOne(id: string, user: User): Promise<Partial<Employee>> {
        const employee = await this.employeesRepository.findOne({
            where: { id },
        });

        if (!employee) {
            throw new NotFoundException(`Employee with ID ${id} not found`);
        }

        const isOwner = employee.id === user.userId;
        const isManager = user.roles.includes('MANAGER');
        const isAdmin = user.roles.includes('ADMIN');

        if (isOwner || isManager || isAdmin) {
            return employee;
        }

        // Co-worker: return non-sensitive fields
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { salary, ssn, ...result } = employee;
        return result;
    }

    async update(
        id: string,
        updateEmployeeProfileDto: UpdateEmployeeProfileDto,
        user: User,
    ): Promise<void> {
        const employee = await this.employeesRepository.findOne({
            where: { id },
        });

        if (!employee) {
            throw new NotFoundException(`Employee with ID ${id} not found`);
        }

        const isOwner = employee.id === user.userId;
        const isManager = user.roles.includes('MANAGER');
        const isAdmin = user.roles.includes('ADMIN');

        if (!isOwner && !isManager && !isAdmin) {
            throw new ForbiddenException();
        }

        const {
            firstName,
            lastName,
            position,
            department,
            phone,
            location,
            hireDate,
            birthDate,
            salary,
            ssn,
            bio,
            skills,
            imageUrl,
            roles,
        } = updateEmployeeProfileDto;

        if (firstName) employee.first_name = firstName;
        if (lastName) employee.last_name = lastName;
        if (position) employee.position = position;
        if (department) employee.department = department;
        if (phone) employee.phone = phone;
        if (location) employee.location = location;
        if (hireDate) employee.hire_date = new Date(hireDate);
        if (birthDate) employee.birth_date = new Date(birthDate);
        if (salary) employee.salary = parseFloat(salary);
        if (ssn) employee.ssn = ssn;
        if (bio) employee.bio = bio;
        if (skills) employee.skills = skills;
        if (imageUrl) employee.image_url = imageUrl;
        if (roles) employee.roles = roles;

        await this.employeesRepository.save(employee);
    }

    async updateRoles(
        id: string,
        updateEmployeeRolesDto: UpdateEmployeeRolesDto,
    ): Promise<void> {
        const employee = await this.employeesRepository.findOne({
            where: { id },
        });

        if (!employee) {
            throw new NotFoundException(`Employee with ID ${id} not found`);
        }

        employee.roles = updateEmployeeRolesDto.roles;

        await this.employeesRepository.save(employee);
    }
}
