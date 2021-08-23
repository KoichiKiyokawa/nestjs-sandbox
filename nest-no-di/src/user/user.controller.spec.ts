import { User } from '../generated/client';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';

jest.mock('./user.repository');

const dummyUser: User = {
  email: 'hoge@example.com',
  password: 'hogehoge',
  id: 1,
};
(UserRepository.create as jest.Mock).mockResolvedValue(dummyUser);

describe('UserController create', () => {
  it('can create', async () => {
    const result = await new UserController().create(dummyUser);
    expect(result).toBe(dummyUser);
  });
});
