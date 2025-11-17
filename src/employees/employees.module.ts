import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { AuthModule } from '../authz/auth.module';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
@Module({
    imports: [TypeOrmModule.forFeature([Employee]), AuthModule],
    providers: [EmployeesService],
    controllers: [EmployeesController],
    exports: [EmployeesService],
})
export class EmployeesModule {}
