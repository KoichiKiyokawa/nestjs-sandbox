import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { SessionData } from 'express-session';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Session() session: SessionData) {
    const user = await this.authService.validateUser(loginDto);
    session.user = user;
    return { message: 'ok' };
  }

  @Post('logout')
  async logout(@Session() session: SessionData) {
    session.user = null;
    return { message: 'ok' };
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async me(@Session() session: SessionData) {
    return session.user;
  }
}
