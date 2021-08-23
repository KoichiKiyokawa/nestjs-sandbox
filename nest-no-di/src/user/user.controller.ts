import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../generated/client';
import { UserRepository } from './user.repository';

@Controller('users')
export class UserController {
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() user: Omit<User, 'id'>) {
    const createdUser = await UserRepository.create({
      email: user.email,
      password: user.password,
    });

    return createdUser;
  }
}
