import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Audit } from './audit.entity';
import { AuditService } from './audit.service';
import { Employee } from '../employees/employee.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Audit, Employee])],
    providers: [AuditService],
    exports: [AuditService],
})
export class AuditModule {}
