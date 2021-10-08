import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { User } from 'src/user/user.entity';
import { In } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostsByUserIdLoader extends DataLoader<string, Post[]> {
  constructor() {
    super(async (userIds: readonly string[]) => {
      const posts = await Post.find({
        where: { userId: In(userIds as string[]) },
        order: { createdAt: 'DESC' },
      });

      return userIds.map((id) => posts.filter((post) => post.userId === id));
    });
  }
}

@Injectable()
export class LikedPostsByUserIdLoader extends DataLoader<string, Post[]> {
  constructor() {
    super(async (userIds: readonly string[]) => {
      const userWithLikedPosts = await User.find({
        where: { id: In(userIds as string[]) },
        relations: ['likedPosts'],
      });
      return userIds.map(
        (id) => userWithLikedPosts.find((u) => u.id === id)?.likedPosts ?? [],
      );
    });
  }
}
