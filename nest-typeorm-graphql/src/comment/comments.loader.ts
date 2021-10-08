import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { In } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentByPostIdLoader extends DataLoader<string, Comment[]> {
  constructor() {
    super(async (postIds: readonly string[]) => {
      const comments = await Comment.find({
        where: { postId: In(postIds as string[]) },
        relations: ['user'],
      });
      return postIds.map((postId) =>
        comments.filter((comment) => comment.postId === postId),
      );
    });
  }
}
