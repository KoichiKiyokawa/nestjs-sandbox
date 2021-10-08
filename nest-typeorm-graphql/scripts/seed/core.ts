import {
  Connection,
  createConnection as createConnectionBase,
  getConnectionOptions,
} from 'typeorm';

let connection: Connection;
export const createConnection = async () => {
  connection ??= await createConnectionBase({
    ...(await getConnectionOptions()),
    entities: ['src/**/*.entity.ts'],
  });

  return connection;
};
