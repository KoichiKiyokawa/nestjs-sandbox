import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import connectRedis from 'connect-redis';
import redis from 'redis';

const RedisStore = connectRedis(session);

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
      store: new RedisStore({ client: redis.createClient({ host: process.env.REDIS_HOST }) }),
    }),
  );
  await app.listen(3000);
}
bootstrap();
