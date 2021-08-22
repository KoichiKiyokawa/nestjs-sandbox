import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserRepository } from './user.repository';

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @Get()
  async all() {
    return this.userRepository.all();
  }
}
