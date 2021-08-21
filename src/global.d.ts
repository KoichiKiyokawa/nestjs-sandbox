export {};

declare module 'express-session' {
  export interface SessionData {
    user: { email: string; password: string } | null;
  }
}
