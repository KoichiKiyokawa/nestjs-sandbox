import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { compareSync } from 'bcryptjs';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  MAX_FAILED_ATTEMPTS = 5;
  LOCK_MINUTES = 10;

  async validateUser({ email, password }: { email: string; password: string }) {
    const targetUser = await this.authRepository.findByEmail(email);

    if (targetUser === null) {
      await new Promise((resolve) => setTimeout(resolve, 300)); // 攻撃者に「このメアドのユーザは存在しない」と感づかれないように
      throw new UnauthorizedException();
    }

    console.log(targetUser);

    // ロックされている or 間違い回数の上限に達しているか
    if (
      this.isLoginLocked(targetUser) ||
      targetUser.failedLoginAttempts >= this.MAX_FAILED_ATTEMPTS
    ) {
      console.log(this.isLoginLocked(targetUser));
      await this.authRepository.loginLock(targetUser);
      throw new UnauthorizedException({
        statusCode: 401,
        code: 'REACH_MAX_FAILED_ATTEMPTS',
        waitMinutes: this.LOCK_MINUTES,
      });
    }

    // パスワードチェック
    if (!compareSync(password, targetUser.password)) {
      // パスワードが間違っていたら、試行回数をインクリメント
      await this.authRepository.incrementFailedLoginAttempts(targetUser);
      throw new UnauthorizedException();
    }

    // ログインに成功したら、試行回数をリセット
    if (targetUser.failedLoginAttempts > 0) {
      await this.authRepository.resetFailedLoginAttempts(targetUser);
    }

    const { password: _, ...rest } = targetUser; // パスワードはreturnしない
    return rest;
  }

  private isLoginLocked(user: User): boolean {
    if (user.loginLockedAt == null) return false;
    return (
      user.loginLockedAt.getTime() + this.LOCK_MINUTES * 60 * 1000 >
      new Date().getTime()
    );
  }
}
