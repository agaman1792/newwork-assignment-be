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

    @Column({ type: 'text', name: 'profile_id' })
    profileId: string;

    @ManyToOne(() => Employee)
    @JoinColumn({ name: 'profile_id' })
    profile: Employee;

    @Column({ type: 'text', name: 'author_id' })
    authorId: string;

    @ManyToOne(() => Employee)
    @JoinColumn({ name: 'author_id' })
    author: Employee;

    @Column({ type: 'text', name: 'text_original' })
    textOriginal: string;

    @Column({ type: 'text', nullable: true, name: 'text_polished' })
    textPolished: string | null;

    @Column({ type: 'integer', default: 0, name: 'is_polished' })
    isPolished: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
