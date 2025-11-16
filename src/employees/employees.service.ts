import {
    Injectable,
    NotFoundException,
    ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import { CreateEmployeeProfileDto } from './dto/create-employee-profile.dto';
import { UpdateEmployeeProfileDto } from './dto/update-employee-profile.dto';
import { User } from '../authz/users/user.entity';

@Injectable()
export class EmployeesService {
    constructor(
        @InjectRepository(Employee)
        private employeesRepository: Repository<Employee>,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async create(
        createEmployeeProfileDto: CreateEmployeeProfileDto,
    ): Promise<Employee> {
        const { userId, ...employeeData } = createEmployeeProfileDto;
        const user = await this.usersRepository.findOne({
            where: { id: userId },
        });

        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        const employee = this.employeesRepository.create({
            user_id: userId,
            first_name: employeeData.firstName,
            last_name: employeeData.lastName,
            position: employeeData.position,
            department: employeeData.department,
            phone: employeeData.phone,
            location: employeeData.location,
            hire_date: new Date(employeeData.hireDate),
            birth_date: new Date(employeeData.birthDate),
            salary: parseFloat(employeeData.salary),
            ssn: employeeData.ssn,
            bio: employeeData.bio,
            skills: employeeData.skills,
            image_url: employeeData.imageUrl,
        });

        return this.employeesRepository.save(employee);
    }

    async findOne(id: string, user: User): Promise<Partial<Employee>> {
        const employee = await this.employeesRepository.findOne({
            where: { id },
            relations: ['user'],
        });

        if (!employee) {
            throw new NotFoundException(`Employee with ID ${id} not found`);
        }

        const isOwner = employee.user_id === user.id;
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
            relations: ['user'],
        });

        if (!employee) {
            throw new NotFoundException(`Employee with ID ${id} not found`);
        }

        const isOwner = employee.user_id === user.id;
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

        await this.employeesRepository.save(employee);
    }
}
