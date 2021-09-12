import { hash } from 'bcrypt';
import { v4 as uuid } from 'uuid';

import createConnection from '../index';

async function setupAdminSeed() {
  const connection = await createConnection();

  const password = await hash('admin', 8);
  const user = {
    id: uuid(),
    name: 'João',
    email: 'admin@rentx.com',
    password,
    isAdmin: true,
    created_at: 'now()', // now() in postgresql is like new Date().toISOString(),
    driver_license: '123456789',
  };

  await connection.query(
    `
     INSERT INTO USERS (id, name, email, password, "isAdmin", created_at, driver_license)
     VALUES ('${user.id}', '${user.name}', '${user.email}', '${user.password}', '${user.isAdmin}', '${user.created_at}', '${user.driver_license}')
     `,
  );

  await connection.close();
}

setupAdminSeed()
  .then(() => console.log('setup admin seed with success'))
  .catch((error) =>
    console.error(error, `setup admin seed with error: ${error.message}`),
  );
