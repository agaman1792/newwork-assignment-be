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
@Entity('AbsenceRequests')
export class AbsenceRequest {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', name: 'profile_id' })
    profileId: string;

    @ManyToOne(() => Employee)
    @JoinColumn({ name: 'profile_id' })
    profile: Employee;

    @Column({ type: 'text', nullable: true, name: 'approver_id' })
    approverId: string;

    @ManyToOne(() => Employee)
    @JoinColumn({ name: 'approver_id' })
    approver: Employee;

    @Column({ type: 'datetime', name: 'start_date' })
    startDate: Date;

    @Column({ type: 'datetime', name: 'end_date' })
    endDate: Date;

    @Column({ type: 'text' })
    reason: string;

    @Column({ type: 'text' })
    status: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
