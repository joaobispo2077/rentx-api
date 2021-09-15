require('./src/config/environment');
const path = require('path');

module.exports = {
  type: 'postgres',
  name: process.env.POSTGRES_NAME,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  migrations: [path.join('.', 'src', 'shared', 'infra', 'typeorm', 'migrations', '*.ts')],
  entities: [path.join('.', 'src', 'modules', '**', 'entities', '*.ts')],
  cli: {
    migrationsDir: path.join('.', 'src', 'shared', 'infra', 'typeorm', 'migrations'),
  }
}
