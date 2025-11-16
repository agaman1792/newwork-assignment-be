import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Employee } from '../employees/employee.entity';
import { User } from '../authz/users/user.entity';

@Entity('AbsenceRequests')
export class AbsenceRequest {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    profile_id: string;

    @ManyToOne(() => Employee)
    @JoinColumn({ name: 'profile_id' })
    profile: Employee;

    @Column({ type: 'text', nullable: true })
    approver_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'approver_id' })
    approver: User;

    @Column({ type: 'datetime' })
    start_date: Date;

    @Column({ type: 'datetime' })
    end_date: Date;

    @Column({ type: 'text' })
    reason: string;

    @Column({ type: 'text' })
    status: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
