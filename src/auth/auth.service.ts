import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compareSync } from 'bcryptjs';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async validateUser({ email, password }: { email: string; password: string }) {
    const targetUser = await this.authRepository.findByEmail(email);

    if (targetUser === null || !compareSync(password, targetUser.password))
      throw new UnauthorizedException();

    const { password: _, ...rest } = targetUser;
    return rest;
  }
}
