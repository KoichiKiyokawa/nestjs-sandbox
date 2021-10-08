import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResolver } from './user/user.resolver';
import { PostResolver } from './post/post.resolver';
import { PostsLoader } from './post/posts.loader';
import { UserLoader } from './user/user.loader';

@Module({
  imports: [
    GraphQLModule.forRoot({ autoSchemaFile: 'schema.gql' }),
    TypeOrmModule.forRoot(),
  ],
  controllers: [],
  providers: [UserResolver, UserLoader, PostResolver, PostsLoader],
})
export class AppModule {}
