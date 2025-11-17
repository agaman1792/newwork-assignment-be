import {
    Injectable,
    ConflictException,
    UnauthorizedException,
    NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../employees/employee.entity';
import { RegisterEmployeeDto } from './dto/register-employee.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Employee)
        private employeesRepository: Repository<Employee>,
        private jwtService: JwtService,
    ) {}

    async login(loginDto: LoginDto): Promise<{ token: string }> {
        const { email, password } = loginDto;
        const employee = await this.employeesRepository
            .createQueryBuilder('employee')
            .addSelect('employee.password_hash')
            .where('employee.email = :email', { email })
            .getOne();

        if (employee && (await bcrypt.compare(password, employee.password_hash))) {
            const payload = {
                sub: employee.id,
                email: employee.email,
                roles: employee.roles,
            };
            return {
                token: this.jwtService.sign(payload, {
                    expiresIn: '1Y'
                }),
            };
        }
        throw new UnauthorizedException('Please check your login credentials');
    }

    async changePassword(
        userId: string,
        changePasswordDto: ChangePasswordDto,
    ): Promise<void> {
        const { oldPassword, newPassword } = changePasswordDto;
        const employee = await this.employeesRepository
            .createQueryBuilder('employee')
            .addSelect('employee.password_hash')
            .where('employee.id = :id', { id: userId })
            .getOne();

        if (!employee || !(await bcrypt.compare(oldPassword, employee.password_hash))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        employee.password_hash = await bcrypt.hash(newPassword, 10);
        await this.employeesRepository.save(employee);
    }

    async resetPassword(
        resetPasswordDto: ResetPasswordDto,
    ): Promise<{ password }> {
        const { email } = resetPasswordDto;
        const employee = await this.employeesRepository.findOne({ where: { email } });

        if (!employee) {
            throw new NotFoundException('User not found');
        }

        const newPassword = Math.random().toString(36).slice(-12);
        employee.password_hash = await bcrypt.hash(newPassword, 10);
        await this.employeesRepository.save(employee);

        return { password: newPassword };
    }

    async getProfile(userId: string): Promise<Omit<Employee, 'password_hash'>> {
        const employee = await this.employeesRepository.findOne({
            where: { id: userId },
        });
        if (!employee) {
            throw new NotFoundException('User not found');
        }
        const { password_hash, ...result } = employee;
        return result;
    }
}
