import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from '../comment/comment.entity';
import { Post } from '../post/post.entity';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id!: string;

  @Column()
  @Field()
  name!: string;

  @Column()
  @Field()
  email!: string;

  @Column()
  password!: string;

  @Column({ type: 'date' })
  @Field(() => String)
  birthday!: Date;

  @OneToMany(() => Post, (post) => post.user)
  @Field(() => [Post])
  posts!: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  @Field(() => [Comment])
  comments!: Comment[];
}
