import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IContext } from 'src/app.type';

export const CurrentUserId = createParamDecorator(
  (_, context: ExecutionContext) => {
    return GqlExecutionContext.create(context).getContext<IContext>().req
      .session.userId;
  },
);
