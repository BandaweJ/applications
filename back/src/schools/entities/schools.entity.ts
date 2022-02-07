import { UsersEntity } from 'src/auth/entities/users.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';

@Entity('schools')
export class SchoolsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  cell: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @OneToMany(() => UsersEntity, (user) => user.school)
  users: UsersEntity[];
}
