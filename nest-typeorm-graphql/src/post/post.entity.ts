import { Field, ObjectType } from '@nestjs/graphql';
import { Comment } from '../comment/comment.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
@ObjectType()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id!: string;

  @Column()
  @Field()
  title!: string;

  @Column()
  @Field()
  body!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToOne(() => User, (user) => user.posts)
  @Field(() => User)
  user!: User;
  @Column()
  userId!: string;

  @ManyToMany(() => User, (user) => user.likedPosts)
  @Field(() => [User])
  likedUsers!: User[];

  @OneToMany(() => Comment, (comment) => comment.post)
  @Field(() => [Comment])
  comments!: Comment[];
}
