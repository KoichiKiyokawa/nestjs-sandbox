import { Comment } from '../../src/comment/comment.entity';
import { Post } from '../../src/post/post.entity';
import { createConnection } from './core';

(async () => {
  const connection = await createConnection();

  const posts = await Post.find();

  await Promise.all(
    posts.map((post) =>
      connection
        .createQueryBuilder()
        .insert()
        .into(Comment)
        .values(
          Array.from(Array(10).keys()).map((c) => ({
            postId: post.id,
            userId: post.userId,
            text: `post${post.id}-comment${c}`,
          })),
        )
        .execute(),
    ),
  );
})();
