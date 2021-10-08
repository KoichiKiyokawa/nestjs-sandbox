import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import { UserLoader } from 'src/user/user.loader';
import { Post } from './post.entity';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly userLoader: UserLoader) {}

  @Query(() => Post)
  async post(@Args('id') id: string) {
    return Post.findOne({ where: { id } });
  }

  @Query(() => [Post])
  async posts(@Args('limit', { nullable: true }) limit?: number) {
    return Post.find({ ...(limit && { take: limit }) });
  }

  @ResolveField(() => User)
  async user(@Parent() post: Post) {
    return this.userLoader.load(post.userId);
  }
}
