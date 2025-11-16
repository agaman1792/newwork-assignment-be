import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from '../authz/users/user.entity';

@Entity('Employees')
export class Employee {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', unique: true, nullable: true })
    user_id: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ type: 'text' })
    first_name: string;

    @Column({ type: 'text' })
    last_name: string;

    @Column({ type: 'text' })
    position: string;

    @Column({ type: 'text' })
    department: string;

    @Column({ type: 'text' })
    phone: string;

    @Column({ type: 'text' })
    location: string;

    @Column({ type: 'datetime' })
    hire_date: Date;

    @Column({ type: 'datetime' })
    birth_date: Date;

    @Column({ type: 'real' })
    salary: number;

    @Column({ type: 'text' })
    ssn: string;

    @Column({ type: 'text' })
    bio: string;

    @Column({ type: 'text' })
    skills: string;

    @Column({ type: 'text' })
    image_url: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
