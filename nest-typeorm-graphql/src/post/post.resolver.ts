import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CommentByPostIdLoader } from 'src/comment/comments.loader';
import { User } from 'src/user/user.entity';
import { UserLoader } from 'src/user/user.loader';
import { Post } from './post.entity';

@Resolver(() => Post)
export class PostResolver {
  constructor(
    private readonly userLoader: UserLoader,
    private readonly commentByPostIdLoader: CommentByPostIdLoader,
  ) {}

  @Query(() => Post)
  async post(@Args('id') id: string) {
    return Post.findOne({ where: { id } });
  }

  @Query(() => [Post])
  async posts(
    @Args('limit', { type: () => Int, nullable: true }) limit?: number,
  ) {
    return Post.find({ ...(limit && { take: limit }) });
  }

  @ResolveField(() => User)
  async user(@Parent() post: Post) {
    return this.userLoader.load(post.userId);
  }

  @ResolveField(() => [Comment])
  async comments(@Parent() post: Post) {
    return this.commentByPostIdLoader.load(post.id);
  }
}
