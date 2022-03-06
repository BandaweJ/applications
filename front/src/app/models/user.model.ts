import { GetSchool } from './get-school';

export class User {
  username!: string;
  expiresIn!: number;
  iat!: number;
  exp!: number;
  school!: GetSchool;
}
