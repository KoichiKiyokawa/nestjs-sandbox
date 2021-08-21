import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'verbose', 'warn', 'log'],
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    session({
      secret: 'averylongsessionsecret',
      resave: false,
      saveUninitialized: false,
      cookie: { httpOnly: true },
    }),
  );
  await app.listen(3000);
}
bootstrap();
