import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import bcrypt from 'bcryptjs';
import { User } from '../generated/client';

@Controller('auth')
export class AuthController {
  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Session() session: { user: User },
  ) {
    const { email, password } = body;
    const user = await UserRepository.findByEmail(email);
    const commonError = new UnauthorizedException(
      'email or password is wrong.',
    );
    if (user == null) throw commonError;

    const ok = bcrypt.compareSync(password, user.password);
    if (!ok) throw commonError;

    // write to session
    session.user = user;
    return { message: 'ok' };
  }

  @Get('check')
  check(@Session() session: { user: User }) {
    if (session.user == null) throw new UnauthorizedException();

    return { message: 'ok' };
  }
}
