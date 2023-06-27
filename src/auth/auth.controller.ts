import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import JwtAuthGuard from 'src/guards/jwt-auth.guard';
import { Response } from 'express';
import { ServiceResponse } from 'src/lib/ServiceResponse';
import { LoginAuthDto } from './dto/login-auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiBody({
    type: LoginAuthDto,
  })
  @Post('login')
  async handleLogin(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);
    response.status(HttpStatus.OK);
    response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  async handleTest(@CurrentUser() user: User) {
    return user || 'Hello';
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async handleLogout(@Res({ passthrough: true }) response: Response) {
    await this.authService.logout(response);
    response.status(HttpStatus.OK);
    return (new ServiceResponse().message = 'Logout Successfully.');
  }
}
