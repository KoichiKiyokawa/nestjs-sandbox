import { Module } from '@nestjs/common';
import { CommentByPostIdLoader } from './comments.loader';

@Module({
  providers: [CommentByPostIdLoader],
})
export class CommentModule {}
