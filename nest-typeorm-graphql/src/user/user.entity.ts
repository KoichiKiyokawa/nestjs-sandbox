import { Field, ObjectType } from '@nestjs/graphql';
import { Post } from '../post/post.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id!: string;

  @Column()
  @Field()
  name!: string;

  @Column({ type: 'date' })
  @Field(() => String)
  birthday!: Date;

  @OneToMany(() => Post, (post) => post.user)
  @Field(() => [Post])
  posts!: Post[];
}
