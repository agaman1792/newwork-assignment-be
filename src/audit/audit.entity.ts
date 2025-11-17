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

    @Column({ type: 'text' })
    user_id: string;

    @ManyToOne(() => Employee)
    @JoinColumn({ name: 'user_id' })
    user: Employee;

    @Column({ type: 'text' })
    action: string;

    @Column({ type: 'text' })
    entity: string;

    @Column({ type: 'text' })
    entity_id: string;

    @Column({ type: 'text' })
    details: string;

    @CreateDateColumn()
    created_at: Date;
}
