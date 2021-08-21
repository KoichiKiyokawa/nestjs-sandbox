import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async validateUser({ email, password }: { email: string; password: string }) {
    const targetUser = await this.authRepository.findByEmail(email);
    if (targetUser === null || targetUser.password !== password)
      throw new UnauthorizedException();

    return targetUser;
  }
}
