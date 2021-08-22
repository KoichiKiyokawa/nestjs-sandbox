import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthRepository {
  constructor(private readonly pismaService: PrismaService) {}

  async findByEmail(email: string) {
    return this.pismaService.user.findUnique({ where: { email } });
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    return this.pismaService.user.update({ where: { id }, data });
  }

  async loginLock(user: User) {
    return this.update(user.id, {
      loginLockedAt: new Date(),
      failedLoginAttempts: 0, // ログインロック解除後に、再び試行回数を与えられるように
    });
  }

  async incrementFailedLoginAttempts(user: User) {
    return this.update(user.id, {
      failedLoginAttempts: user.failedLoginAttempts + 1,
    });
  }

  async resetFailedLoginAttempts(user: User) {
    return this.update(user.id, { failedLoginAttempts: 0 });
  }
}
