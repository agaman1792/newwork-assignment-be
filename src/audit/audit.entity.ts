import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Employee } from '../employees/employee.entity';

@Entity('Audits')
export class Audit {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', name: 'user_id' })
    userId: string;

    @ManyToOne(() => Employee)
    @JoinColumn({ name: 'user_id' })
    user: Employee;

    @Column({ type: 'text' })
    action: string;

    @Column({ type: 'text' })
    entity: string;

    @Column({ type: 'text', name: 'entity_id' })
    entityId: string;

    @Column({ type: 'text' })
    details: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
