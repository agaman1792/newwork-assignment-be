import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('Employees')
export class Employee {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', unique: true })
    email: string;

    @Column({ type: 'text', select: false })
    password_hash: string;

    @Column({ type: 'text' })
    roles: string;

    @Column({ type: 'integer', default: 1 })
    is_active: number;

    @Column({ type: 'text', nullable: true })
    first_name: string;

    @Column({ type: 'text', nullable: true })
    last_name: string;

    @Column({ type: 'text', nullable: true })
    position: string;

    @Column({ type: 'text', nullable: true })
    department: string;

    @Column({ type: 'text', nullable: true })
    phone: string;

    @Column({ type: 'text', nullable: true })
    location: string;

    @Column({ type: 'datetime', nullable: true })
    hire_date: Date;

    @Column({ type: 'datetime', nullable: true })
    birth_date: Date;

    @Column({ type: 'real', nullable: true })
    salary: number;

    @Column({ type: 'text', nullable: true })
    ssn: string;

    @Column({ type: 'text', nullable: true })
    bio: string;

    @Column({ type: 'text', nullable: true })
    skills: string;

    @Column({ type: 'text', nullable: true })
    image_url: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
