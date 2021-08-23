import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserController } from './user/user.controller';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [],
  controllers: [AppController, UserController, AuthController],
})
export class AppModule {}
