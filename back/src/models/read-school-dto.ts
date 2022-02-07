import { IsEmail, IsString } from 'class-validator';
import { UsersEntity } from 'src/auth/entities/users.entity';

export class ReadSchoolDto {
  id: string;

  name: string;

  cell: string;

  email: string;

  address: string;

  users: UsersEntity[];
}
