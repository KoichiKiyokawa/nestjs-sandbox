import { UnauthorizedException } from '@nestjs/common';
import { hashSync } from 'bcryptjs';
import { PrismaService } from 'src/db/prisma.service';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';

class InMemoryAuthRepository extends AuthRepository {
  users = [
    { id: '1', email: 'dummy@example.com', password: hashSync('dummy') },
  ];

  async findByEmail(email: string) {
    return this.users.find((user) => user.email === email) ?? null;
  }
}

describe('AuthService', () => {
  const authService = new AuthService(
    new InMemoryAuthRepository(null as unknown as PrismaService),
  );

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
});
