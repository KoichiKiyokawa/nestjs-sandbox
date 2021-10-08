import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Post } from 'src/post/post.entity';
import { PostsLoader } from 'src/post/posts.loader';
import { CreateUserInput } from './inputs/create-user-input';
import { UpdateUserInput } from './inputs/update-user-input';
import { User } from './user.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly postsLoader: PostsLoader) {}

  @Query(() => [User])
  async users(
    @Args('limit', { type: () => Int, nullable: true }) limit?: number,
  ) {
    return User.find({ ...(limit && { take: limit }) });
  }

  @ResolveField(() => [Post])
  async posts(@Parent() parent: User) {
    return this.postsLoader.load(parent.id);
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return User.create(createUserInput).save();
  }

  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    const { id, ...data } = updateUserInput;
    await User.update(id, data);
    return updateUserInput;
  }

  @Mutation(() => User)
  async deleteUser(@Args('id') id: string) {
    await User.delete(id);
    return { id };
  }
}