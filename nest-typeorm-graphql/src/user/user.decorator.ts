import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IContext } from 'src/app.type';

export const CurrentUserId = createParamDecorator(
  (_, context: ExecutionContext) => {
    const userId =
      GqlExecutionContext.create(context).getContext<IContext>().req.session
        .userId;
    if (userId == null) throw new UnauthorizedException();

    return userId;
  },
);
