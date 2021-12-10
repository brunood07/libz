import request, { Response } from 'supertest';
import { Connection } from 'typeorm';

import { app } from '@shared/infra/http/app';

import createConnection from '@shared/infra/typeorm';

let connection: Connection;

let responseUser: Response;
let responseToken: Response;

describe('User profile controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    responseUser = await request(app).post("/users").send({
      full_name: "Test Name",
      email: "test@test.com",
      password: "passwordtest",
      address: "test address",
      telephone: "1199887766997",
      id_number: "89878764618"
    });

    responseToken = await request(app)
      .post("/sessions")
      .send({ email: "test@test.com", password: "passwordtest" });
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to show the user profile", async () => {
    const response = await request(app)
      .get("/users/profile")
      .set({ Authorization: `Bearer ${responseToken.body.token}` });

    expect(typeof response.body).toBe("object");
  })
})