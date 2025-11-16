import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Audit } from './audit.entity';
import { AuditService } from './audit.service';
import { User } from 'src/authz/users/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Audit, User])],
    providers: [AuditService],
    exports: [AuditService],
})
export class AuditModule {}
