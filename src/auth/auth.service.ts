import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { GetuserDTO } from 'src/users/dto/get-user.dto';

export interface TokenPayload {
  userId: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectMapper() private readonly classMapper: Mapper,
    @Inject(UsersService)
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User, response: Response) {
    const tokenPayload: TokenPayload = {
      userId: user.id,
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    const token = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }

  logout(response: Response) {
    response.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(),
    });
  }

  async validateUser(email: string, password: string) {
    const user: User = await this.userService.getUser({ email });
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    return await this.classMapper.mapAsync(user, User, GetuserDTO);
  }

  async getUser(getUserArgs: Partial<User>) {
    const user: User = await await this.userService.getUser(getUserArgs);
    return await this.classMapper.mapAsync(user, User, GetuserDTO);
  }
}
