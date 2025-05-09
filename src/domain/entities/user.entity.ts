import { Column } from 'typeorm';
import { BaseEntity } from './base.entity';

export class User extends BaseEntity {
  @Column({
    type: 'varchar',
    name: 'email',
    nullable: false,
    unique: true,
    length: 100,
  })
  email: string;

  @Column({
    type: 'varchar',
    name: 'name',
    nullable: false,
    length: 100,
  })
  name: string;

  @Column({
    type: 'varchar',
    name: 'password',
    nullable: false,
    length: 255,
  })
  password: string;
}
