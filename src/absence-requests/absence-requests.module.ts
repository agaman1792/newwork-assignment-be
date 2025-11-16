import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbsenceRequest } from './absence-request.entity';
import { AbsenceRequestsController } from './absence-requests.controller';
import { AbsenceRequestsService } from './absence-requests.service';
import { Employee } from '../employees/employee.entity';
import { AuthModule } from '../authz/auth.module';
import { User } from 'src/authz/users/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([AbsenceRequest, Employee, User]),
        AuthModule,
    ],
    controllers: [AbsenceRequestsController],
    providers: [AbsenceRequestsService],
})
export class AbsenceRequestsModule {}
