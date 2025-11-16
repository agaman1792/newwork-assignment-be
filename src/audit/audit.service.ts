import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Audit } from './audit.entity';

@Injectable()
export class AuditService {
    constructor(
        @InjectRepository(Audit)
        private auditRepository: Repository<Audit>,
    ) {}

    async log(
        userId: string,
        action: string,
        entity: string,
        entityId: string,
        details?: any,
    ): Promise<Audit> {
        const auditLog = this.auditRepository.create({
            user_id: userId,
            action,
            entity,
            entity_id: entityId,
            details: details ? JSON.stringify(details) : '',
        });

        return await this.auditRepository.save(auditLog);
    }
}
