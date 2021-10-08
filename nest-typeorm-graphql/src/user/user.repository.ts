import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserRepository {
  async findByEmail(email: string) {
    return User.findOne({ where: { email } });
  }
}
