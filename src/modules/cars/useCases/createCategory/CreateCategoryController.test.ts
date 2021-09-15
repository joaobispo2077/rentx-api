import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

const getMockAdmin = async () => {
  const password = 'admin';
  const encryptedPassword = await hash(password, 8);
  const user = {
    id: uuid(),
    name: 'João',
    email: 'admin@rentx.com',
    password,
    encryptedPassword,
    isAdmin: true,
    created_at: 'now()',
    driver_license: '123456789',
  };

  return user;
};

let connection: Connection;

describe('Controller - Create category', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
    const user = await getMockAdmin();

    await connection.query(
      `
       INSERT INTO USERS (id, name, email, password, "isAdmin", created_at, driver_license)
       VALUES ('${user.id}', '${user.name}', '${user.email}', '${user.encryptedPassword}', '${user.isAdmin}', '${user.created_at}', '${user.driver_license}')
       `,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new category', async () => {
    const user = await getMockAdmin();
    const responseSession = await request(app).post('/sessions').send(user);
    const { token = '' } = responseSession.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Test',
        description: 'Description test',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    console.log('response is', response.body);

    expect(response.status).toBe(201);
  });
});
