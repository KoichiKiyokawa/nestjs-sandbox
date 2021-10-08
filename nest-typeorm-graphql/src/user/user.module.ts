import { Module } from '@nestjs/common';
import { PostsByUserIdLoader } from 'src/post/posts.loader';
import { UserLoader } from './user.loader';
import { UserResolver } from './user.resolver';

@Module({
  providers: [UserLoader, UserResolver, PostsByUserIdLoader],
})
export class UserModule {}
