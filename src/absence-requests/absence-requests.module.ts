import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbsenceRequest } from './absence-request.entity';
import { AbsenceRequestsController } from './absence-requests.controller';
import { AbsenceRequestsByProfileController } from './absence-requests-by-profile.controller';
import { AbsenceRequestsService } from './absence-requests.service';
import { Employee } from '../employees/employee.entity';
import { AuthModule } from '../authz/auth.module';
@Module({
    imports: [
        TypeOrmModule.forFeature([AbsenceRequest, Employee]),
        AuthModule,
    ],
    controllers: [
        AbsenceRequestsController,
        AbsenceRequestsByProfileController,
    ],
    providers: [AbsenceRequestsService],
})
export class AbsenceRequestsModule {}
