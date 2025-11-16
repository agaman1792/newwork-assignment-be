import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Feedback } from './feedback.entity';
import { AuthModule } from '../authz/auth.module';
import { EmployeesModule } from '../employees/employees.module';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { Employee } from '../employees/employee.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Feedback, Employee]),
        AuthModule,
        EmployeesModule,
        HttpModule,
    ],
    providers: [FeedbackService],
    controllers: [FeedbackController],
    exports: [FeedbackService],
})
export class FeedbackModule {}
