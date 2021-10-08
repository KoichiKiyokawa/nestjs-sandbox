import { Module } from '@nestjs/common';
import { CommentByPostIdLoader } from './comments.loader';
import { CommentResolver } from './comment.resolver';

@Module({
  providers: [CommentByPostIdLoader, CommentResolver],
})
export class CommentModule {}
