require('dotenv/config');
const path = require('path');

module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  migrations: [path.join('.', 'src', 'database', 'migrations', '*.ts')],
  cli: {
    migrationsDir: path.join('.', 'src', 'database', 'migrations'),
  }
}
