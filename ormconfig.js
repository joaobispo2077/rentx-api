require('./src/config/environment');
const path = require('path');

const {
  POSTGRES_NAME,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DATABASE,
  NODE_ENV
} = process.env;

const migrationsSource = NODE_ENV === 'production' ? 'dist' : 'src';
const migrationsExtension = NODE_ENV === 'production' ? '*.js' : '*.ts';

module.exports = {
  type: 'postgres',
  name: POSTGRES_NAME,
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DATABASE,
  migrations: [path.join('.', migrationsSource, 'shared', 'infra', 'typeorm', 'migrations', migrationsExtension)],
  entities: [path.join('.', migrationsSource, 'modules', '**', 'entities', migrationsExtension)],
  cli: {
    migrationsDir: path.join('.', migrationsSource, 'shared', 'infra', 'typeorm', 'migrations'),
  }
}
