import { SchoolsEntity } from 'src/schools/entities/schools.entity';
import * as bcrypt from 'bcrypt';
import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  ManyToOne,
  Unique,
} from 'typeorm';

@Entity('users')
@Unique(['username'])
export class UsersEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: false })
  verified: boolean;

  @Column()
  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @ManyToOne(() => SchoolsEntity, (school) => school.users, { eager: true })
  school: SchoolsEntity;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);

    return hash === this.password;
  }
}
