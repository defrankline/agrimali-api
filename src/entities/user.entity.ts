import {Entity, Column, Index, BeforeInsert, JoinTable, ManyToMany, OneToMany, JoinColumn} from 'typeorm';
import bcrypt from 'bcryptjs';
import Model from './model.entity';

@Entity('users')
export class User extends Model {
  @Column()
  name: string;

  @Index('email_index')
  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    default: 'default.png',
  })
  photo: string;

  @Column({
    default: false,
  })
  verified: boolean;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  static async comparePasswords(
    candidatePassword: string,
    hashedPassword: string
  ) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }

  toJSON() {
    return { ...this, password: undefined, verified: undefined };
  }
}
