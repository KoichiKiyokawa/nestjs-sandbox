import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthRepository {
  users: LoginDto[] = [{ email: 'hoge@example.com', password: 'hogehoge' }];

  async findByEmail(email: string) {
    return this.users.find((u) => u.email === email);
  }
}
