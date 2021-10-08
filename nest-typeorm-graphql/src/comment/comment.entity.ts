import { Field, ObjectType } from '@nestjs/graphql';
import { Post } from '../post/post.entity';
import { User } from '../user/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id!: string;

  @Column()
  @Field()
  text!: string;

  @ManyToOne(() => User, (user) => user.comments)
  @Field(() => User)
  user!: User;
  @Column()
  @Field()
  userId!: string;

  @ManyToOne(() => Post, (post) => post.comments)
  @Field(() => Post)
  post!: Post;
  @Column()
  @Field()
  postId!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
