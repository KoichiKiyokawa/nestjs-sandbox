import { ISession } from './auth/auth.type';

export interface IContext {
  req: {
    session: ISession;
  };
}
