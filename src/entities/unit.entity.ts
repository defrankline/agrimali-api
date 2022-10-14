import {Entity, Column, Index, BeforeInsert} from 'typeorm';
import bcrypt from 'bcryptjs';
import Model from './model.entity';


@Entity('units')
export class Unit extends Model {
    @Column({nullable: false})
    name: string;

    @Column({nullable: false, unique: true})
    code: string;
}
