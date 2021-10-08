import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  entities: ['dist/**/*.entity.js'],
  username: 'postgres',
  password: 'postgres',
  logging: true,
  migrations: ['migrations/**/*.ts'],
  cli: {
    migrationsDir: 'migrations',
  },
};

export default config;
