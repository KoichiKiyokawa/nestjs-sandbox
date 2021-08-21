declare module 'express-session' {
  interface Session {
    user: { email: string; password: string };
  }
}
