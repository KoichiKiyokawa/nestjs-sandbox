import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly userRepo: UserRepository) {}

  async validateAuth(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);
    if (user == null) throw new UnauthorizedException();

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException();

    return true;
  }
}
