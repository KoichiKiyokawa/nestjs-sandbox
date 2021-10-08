import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfigBase from '../ormconfig';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';

// migrations の設定があると、start:devをしたときにtsファイルを読み込みに行ってエラーがでる
const { migrations: _, ...ormConfig } = ormConfigBase;

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile:
        process.env.NODE_ENV === 'production' ? true : 'schema.gql',
    }),
    TypeOrmModule.forRoot(ormConfig),
    UserModule,
    PostModule,
    CommentModule,
    AuthModule,
  ],
})
export class AppModule {}
