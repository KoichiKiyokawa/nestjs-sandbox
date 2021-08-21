import { hashSync } from 'bcryptjs';
import { PrismaService } from 'src/db/prisma.service';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';

class InMemoryAuthRepository extends AuthRepository {
  async findByEmail(_email: string) {
    return { id: '1', email: 'dummy@example.com', password: hashSync('dummy') };
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
  });
});
