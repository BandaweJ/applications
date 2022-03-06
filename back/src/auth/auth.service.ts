import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './repositories/users.repository';
import { AuthCredentialsDto } from './models/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './models/jwtpayload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto) {
    return await this.usersRepository.signUp(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const userDetails = await this.usersRepository.validateUserPassword(
      authCredentialsDto,
    );

    if (!userDetails) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const expiresIn = 3600;
    const payload: JwtPayload = { ...userDetails, expiresIn };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
