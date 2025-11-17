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

    @Column({ type: 'text', select: false, name: 'password_hash' })
    passwordHash: string;

    @Column({ type: 'text' })
    roles: string;

    @Column({ type: 'integer', default: 1, name: 'is_active' })
    isActive: number;

    @Column({ type: 'text', nullable: true, name: 'first_name' })
    firstName: string;

    @Column({ type: 'text', nullable: true, name: 'last_name' })
    lastName: string;

    @Column({ type: 'text', nullable: true })
    position: string;

    @Column({ type: 'text', nullable: true })
    department: string;

    @Column({ type: 'text', nullable: true })
    phone: string;

    @Column({ type: 'text', nullable: true })
    location: string;

    @Column({ type: 'datetime', nullable: true, name: 'hire_date' })
    hireDate: Date;

    @Column({ type: 'datetime', nullable: true, name: 'birth_date' })
    birthDate: Date;

    @Column({ type: 'real', nullable: true })
    salary: number;

    @Column({ type: 'text', nullable: true })
    ssn: string;

    @Column({ type: 'text', nullable: true })
    bio: string;

    @Column({ type: 'text', nullable: true })
    skills: string;

    @Column({ type: 'text', nullable: true, name: 'image_url' })
    imageUrl: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
