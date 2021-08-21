import { Body, Controller, Post, Session } from '@nestjs/common';
import { Session as ISession } from 'express-session';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Session() session: ISession) {
    const user = await this.authService.validateUser(loginDto);
    session.user = user;
    return { message: 'ok' };
  }
}
