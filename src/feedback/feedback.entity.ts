import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Employee } from '../employees/employee.entity';
@Entity('Feedbacks')
export class Feedback {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    profile_id: string;

    @ManyToOne(() => Employee)
    @JoinColumn({ name: 'profile_id' })
    profile: Employee;

    @Column({ type: 'text' })
    author_id: string;

    @ManyToOne(() => Employee)
    @JoinColumn({ name: 'author_id' })
    author: Employee;

    @Column({ type: 'text' })
    text_original: string;

    @Column({ type: 'text', nullable: true })
    text_polished: string | null;

    @Column({ type: 'integer', default: 0 })
    is_polished: number;

    @CreateDateColumn()
    created_at: Date;
}
