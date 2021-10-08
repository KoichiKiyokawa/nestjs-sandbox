import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from '../ormconfig';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile:
        process.env.NODE_ENV === 'production' ? true : 'schema.gql',
    }),
    // migrations の設定があると、start:devをしたときにtsファイルを読み込みに行ってエラーがでる
    TypeOrmModule.forRoot({ ...ormConfig, migrations: undefined }),
    UserModule,
    PostModule,
    CommentModule,
    AuthModule,
  ],
})
export class AppModule {}
