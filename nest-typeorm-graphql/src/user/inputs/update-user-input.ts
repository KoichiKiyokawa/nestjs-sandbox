import { Field, InputType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user-input';

@InputType()
export class UpdateUserInput extends CreateUserInput {
  @Field()
  id!: string;
}
