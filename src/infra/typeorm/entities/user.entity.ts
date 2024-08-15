import { Entity, Column } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

@Entity({ name: 'tb_user' })
export class UserEntity extends AbstractEntity<UserEntity> {
  @Column({ name: 'name', length: 150 })
  name: string;

  @Column({ name: 'email', length: 150, unique: true })
  email: string;

  @Column({ name: 'password', length: 64 })
  password: string;
}
