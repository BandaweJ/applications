import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { UsersEntity } from '../entities/users.entity';
import { AuthCredentialsDto } from '../models/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { SchoolsEntity } from 'src/schools/entities/schools.entity';

@EntityRepository(UsersEntity)
export class UsersRepository extends Repository<UsersEntity> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<UsersEntity> {
    const { username, password, school } = authCredentialsDto;

    const user = new UsersEntity();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.school = school;

    console.log(user.password);

    try {
      return await user.save();
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        //Duplicate username
        throw new ConflictException(`Username ${username} already exists`);
      } else {
        throw new InternalServerErrorException('Something bad happened.');
      }
    }
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ username: string; school: SchoolsEntity }> {
    const { username, password } = authCredentialsDto;

    const user = await this.findOne({ username });

    if (user && (await user.validatePassword(password))) {
      let school = user.school;
      return { username, school };
    } else {
      return null;
      //throw new UnauthorizedException('Username or password is not correct');
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
