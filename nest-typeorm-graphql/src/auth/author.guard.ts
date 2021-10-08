import { CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IContext } from 'src/app.type';

/** 本人でなければ弾く */
export class AuthorGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const gqlExecCtx = GqlExecutionContext.create(context);

    const currentUserId = gqlExecCtx.getContext<IContext>().req.session.userId;
    if (currentUserId == null) return false;

    const incomingUserId = gqlExecCtx.getArgs<{ userId?: string }>().userId;
    if (incomingUserId == null) return false;

    return currentUserId === incomingUserId;
  }
}
