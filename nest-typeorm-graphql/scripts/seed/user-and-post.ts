import bcrypt from 'bcryptjs';
import { Post } from '../../src/post/post.entity';
import { User } from '../../src/user/user.entity';
import { createConnection } from './core';

export async function userAndPostSeed() {
  const conn = await createConnection();

  await conn
    .createQueryBuilder()
    .insert()
    .into(User)
    .values(
      Array.from(Array(100).keys()).map((u) => ({
        name: `user${u}`,
        email: `user${u}@example.com`,
        password: bcrypt.hashSync(`user${u}`),
        birthday: new Date(2000, u % 12, (u % 27) + 1),
      })),
    )
    .execute();

  const users = await User.find();

  await conn
    .createQueryBuilder()
    .insert()
    .into(Post)
    .values(
      users.flatMap((user, u) =>
        Array.from(Array(100), (_, p) => ({
          title: `title-user${u}-post${p}`,
          body: `body-user${u}-post${p}`,
          userId: user.id,
        })),
      ),
    )
    .execute();
}
