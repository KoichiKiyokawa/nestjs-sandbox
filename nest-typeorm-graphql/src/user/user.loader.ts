import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { User } from './user.entity';

@Injectable()
export class UserLoader extends DataLoader<string, User | undefined> {
  constructor() {
    super(async (userIds: readonly string[]) => {
      const users = await User.findByIds(userIds as string[]);
      return userIds.map((id) => users.find((user) => user.id === id));
    });
  }
}
