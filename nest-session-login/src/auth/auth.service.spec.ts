import { UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { hashSync } from 'bcryptjs';
import { PrismaService } from 'src/db/prisma.service';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';

class InMemoryAuthRepository extends AuthRepository {
  static data: User[] = [];
  static getInitialData = () => [
    {
      id: '1',
      email: 'dummy@example.com',
      password: hashSync('dummy'),
      failedLoginAttempts: 0,
      loginLockedAt: null,
    },
  ];
  constructor() {
    super(null as unknown as PrismaService);
    InMemoryAuthRepository.data = InMemoryAuthRepository.getInitialData();
  }

  async findByEmail(email: string) {
    return InMemoryAuthRepository.data.find((user) => user.email === email) ?? null;
  }

  async update(id: string, data: Partial<User>) {
    const targetIndex = InMemoryAuthRepository.data.findIndex((user) => user.id === id);
    InMemoryAuthRepository.data[targetIndex] = {
      ...InMemoryAuthRepository.data[targetIndex],
      ...data,
    };
    return InMemoryAuthRepository.data[targetIndex];
  }
}

class TestAuthService extends AuthService {
  LOCK_MINUTES = 0.05; // 0.05分 = 3秒
}

describe('AuthService', () => {
  const authService = new TestAuthService(new InMemoryAuthRepository());

  describe('validate user', () => {
    it('validate result is ok', async () => {
      const user = await authService.validateUser({
        email: 'dummy@example.com',
        password: 'dummy',
      });
      expect(user).toEqual({ id: '1', email: 'dummy@example.com' });
    });

    it('validate result is not ok (email is wrong)', async () => {
      await expect(
        authService.validateUser({
          email: 'wrong@example.com',
          password: 'dummy',
        }),
      ).rejects.toThrowError(UnauthorizedException);
    });

    it('validate result is not ok (password is wrong)', async () => {
      await expect(
        authService.validateUser({
          email: 'dummy@example.com',
          password: 'wrong',
        }),
      ).rejects.toThrowError(UnauthorizedException);
    });
  });

  describe('login lock', () => {
    async function requestCorrectPassword() {
      return authService.validateUser({
        email: 'dummy@example.com',
        password: 'dummy',
      });
    }

    async function requestWrongPassword() {
      return authService.validateUser({
        email: 'dummy@example.com',
        password: 'wrong',
      });
    }

    async function waitForLoginUnlocked() {
      await new Promise(
        (resolve) => setTimeout(resolve, authService.LOCK_MINUTES * 60 * 1000 + 500), // 500ミリ秒多く待つ
      );
    }

    beforeEach(() => {
      InMemoryAuthRepository.data = InMemoryAuthRepository.getInitialData();
    });

    it('パスワードを5回間違ったら、5回目のリクエストの際に「上限に達したエラー」を返す', async () => {
      for (let i = 1; i <= 4; i++) {
        try {
          await requestWrongPassword();
        } catch (err) {
          // 4回目までは上限に達したエラーを返さない
          expect(err.response.code).not.toBe('REACH_MAX_FAILED_ATTEMPTS');
        }
      }

      // 5回目
      try {
        await requestWrongPassword();
      } catch (err) {
        expect(err.response).toEqual({
          statusCode: 401,
          code: 'REACH_MAX_FAILED_ATTEMPTS',
          waitMinutes: authService.LOCK_MINUTES,
        });
        expect(InMemoryAuthRepository.data[0].loginLockedAt).toBeDefined();
      }
    });

    it('パスワードを5回間違え、6回目でパスワードがあっていても「上限に達したエラー」を返す', async () => {
      for (let i = 1; i <= 5; i++) await requestWrongPassword().catch((e) => e);
      // 6回目
      try {
        await requestCorrectPassword();
      } catch (err) {
        expect(err.response).toEqual({
          statusCode: 401,
          code: 'REACH_MAX_FAILED_ATTEMPTS',
          waitMinutes: authService.LOCK_MINUTES,
        });
        expect(InMemoryAuthRepository.data[0].loginLockedAt).toBeDefined();
      }
    });

    it('ロックの解除(5回間違ったあと、時間をおいてから6回目で成功する)', async () => {
      for (let i = 1; i <= 5; i++) await requestWrongPassword().catch((e) => e);
      expect(InMemoryAuthRepository.data[0].loginLockedAt).toBeDefined();
      await waitForLoginUnlocked();
      expect(await requestCorrectPassword()).toEqual({
        id: '1',
        email: 'dummy@example.com',
      });
    });

    it('ロックの解除(5回間違ったあと、時間をおいて6回目で間違ったとき、試行回数が復活している(間違った回数が6ではなく1で保存されている)', async () => {
      for (let i = 1; i <= 5; i++) await requestWrongPassword().catch((e) => e);
      await waitForLoginUnlocked();
      await requestWrongPassword().catch((e) => e);
      expect(InMemoryAuthRepository.data[0].failedLoginAttempts).toBe(1);
    });
  });
});
