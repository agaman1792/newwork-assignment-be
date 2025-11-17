import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../employees/employee.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserSeederService implements OnModuleInit {
    constructor(
        @InjectRepository(Employee)
        private employeesRepository: Repository<Employee>,
    ) {}

    async onModuleInit() {
        const adminExists = await this.employeesRepository.findOne({
            where: { email: 'admin@example.com' },
        });

        if (!adminExists) {
            const hashedPassword = await bcrypt.hash('admin', 10);
            const admin = this.employeesRepository.create({
                email: 'admin@example.com',
                password_hash: hashedPassword,
                roles: 'ADMIN',
                is_active: 1,
                first_name: 'Admin',
                last_name: 'User',
            });
            await this.employeesRepository.save(admin);
        }
    }
}
