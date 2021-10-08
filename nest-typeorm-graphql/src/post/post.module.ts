import { Module } from '@nestjs/common';
import { CommentByPostIdLoader } from 'src/comment/comments.loader';
import { UserLoader } from 'src/user/user.loader';
import { PostResolver } from './post.resolver';
import { PostsByUserIdLoader } from './posts.loader';

@Module({
  providers: [
    PostResolver,
    PostsByUserIdLoader,
    CommentByPostIdLoader,
    UserLoader,
  ],
})
export class PostModule {}
