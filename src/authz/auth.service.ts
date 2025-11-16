import {
    Injectable,
    ConflictException,
    UnauthorizedException,
    NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}

    async register(registerUserDto: RegisterUserDto): Promise<void> {
        const { email, password, roles } = registerUserDto;

        const existingUser = await this.usersRepository.findOne({
            where: { email },
        });
        if (existingUser) {
            throw new ConflictException('Email already registered');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = this.usersRepository.create({
            email,
            password_hash: hashedPassword,
            roles,
        });

        await this.usersRepository.save(user);
    }

    async login(loginDto: LoginDto): Promise<{ token: string }> {
        const { email, password } = loginDto;
        const user = await this.usersRepository.findOne({ where: { email } });

        if (user && (await bcrypt.compare(password, user.password_hash))) {
            const payload = {
                sub: user.id,
                email: user.email,
                roles: user.roles,
            };
            return {
                token: this.jwtService.sign(payload),
            };
        }
        throw new UnauthorizedException('Please check your login credentials');
    }

    async changePassword(
        userId: string,
        changePasswordDto: ChangePasswordDto,
    ): Promise<void> {
        const { oldPassword, newPassword } = changePasswordDto;
        const user = await this.usersRepository.findOne({
            where: { id: userId },
        });

        if (!user || !(await bcrypt.compare(oldPassword, user.password_hash))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        user.password_hash = await bcrypt.hash(newPassword, 10);
        await this.usersRepository.save(user);
    }

    async resetPassword(
        resetPasswordDto: ResetPasswordDto,
    ): Promise<{ password }> {
        const { email } = resetPasswordDto;
        const user = await this.usersRepository.findOne({ where: { email } });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const newPassword = Math.random().toString(36).slice(-12);
        user.password_hash = await bcrypt.hash(newPassword, 10);
        await this.usersRepository.save(user);

        return { password: newPassword };
    }

    async getProfile(userId: string): Promise<Omit<User, 'password_hash'>> {
        const user = await this.usersRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const { password_hash, ...result } = user;
        return result;
    }
}
