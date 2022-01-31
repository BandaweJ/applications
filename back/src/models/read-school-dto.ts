import { IsEmail, IsString } from 'class-validator';

export class ReadSchoolDto {
  id: string;

  name: string;

  cell: string;

  email: string;

  address: string;
}
