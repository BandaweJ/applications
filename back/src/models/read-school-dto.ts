import { IsEmail, IsString } from 'class-validator';

export class ReadSchoolDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  cell: string;

  @IsEmail()
  email: string;

  @IsString()
  address: string;
}
