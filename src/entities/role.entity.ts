import {Column, Entity} from 'typeorm';
import Model from "./model.entity";

@Entity('roles')
export class Role extends Model{
  @Column({
    nullable: false,
    default: '',
    unique: true,
    name: 'name',
  })
  name: string;
}
