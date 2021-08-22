import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { SessionData } from 'express-session';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest<{ session: SessionData }>();
    return request.session.user != null;
  }
}
