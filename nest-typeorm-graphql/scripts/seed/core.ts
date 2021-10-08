import { Connection, createConnection as createConnectionBase } from 'typeorm';
import ormConfig from '../../ormconfig';

let connection: Connection;
export const createConnection = async () => {
  connection ??= await createConnectionBase({
    ...ormConfig,
    entities: ['src/**/*.entity.ts'],
  });

  return connection;
};
