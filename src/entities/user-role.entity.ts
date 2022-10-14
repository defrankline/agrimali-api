import {Entity, ManyToOne, JoinColumn, Index} from 'typeorm';
import Model from './model.entity';
import {User} from "./user.entity";
import {Role} from "./role.entity";


@Entity('user_roles')
@Index(['user', 'role'], { unique: true })
export class UserRole extends Model {

    @ManyToOne(() => User, { eager: true })
    @JoinColumn()
    user: User;

    @ManyToOne(() => Role, { eager: true })
    @JoinColumn()
    role: Role;
}
