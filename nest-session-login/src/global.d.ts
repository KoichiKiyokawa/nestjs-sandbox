import session from 'express-session';

declare module 'express-session' {
  export default session;
  export interface SessionData {
    user?: { email: string } | null;
  }
}

declare global {
  declare namespace NodeJS {
    interface ProcessEnv {
      REDIS_HOST: string;
    }
  }
}
