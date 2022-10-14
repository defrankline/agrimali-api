import { Entity, Column, Index, BeforeInsert } from 'typeorm';
import bcrypt from 'bcryptjs';
import Model from './model.entity';


@Entity('crops')
export class User extends Model {
  @Column()
  name: string;
}
