import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginGuard } from 'src/auth/auth.guard';
import { CurrentUserId } from 'src/user/user.decorator';
import { Comment } from './comment.entity';

@Resolver()
export class CommentResolver {
  @Mutation(() => Comment)
  @UseGuards(LoginGuard)
  async createComment(
    @Args('postId', { description: 'どの投稿にコメントをつけるか' })
    postId: string,
    @Args('text', { description: 'コメントの文章' }) text: string,
    @CurrentUserId() currentUserId: string,
  ) {
    return Comment.create({
      postId,
      userId: currentUserId,
      text,
    }).save();
  }
}
