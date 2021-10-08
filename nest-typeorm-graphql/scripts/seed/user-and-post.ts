import { createConnection } from './core';
import { Post } from '../../src/post/post.entity';
import { User } from '../../src/user/user.entity';

(async () => {
  await createConnection();

  for (let u = 0; u < 100; u++) {
    const user = User.create({
      name: `user${u}`,
      birthday: new Date(2000, u % 12, (u % 27) + 1),
    });

    const posts = Array.from(Array(100).keys()).map((p) =>
      Post.create({
        title: `title-user${u}-post${p}`,
        body: `body-user${u}-post${p}`,
      }),
    );

    await user.save();
    await Promise.all(
      posts.map((post) => {
        post.user = user;
        return post.save();
      }),
    );
  }
})();
