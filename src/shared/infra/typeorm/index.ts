import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  console.info(
    'creating connection with database: ',
    process.env.POSTGRES_DATABASE,
  );
  return createConnection(defaultOptions);
};
