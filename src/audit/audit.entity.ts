import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../authz/users/user.entity';

@Entity('Audits')
export class Audit {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

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
