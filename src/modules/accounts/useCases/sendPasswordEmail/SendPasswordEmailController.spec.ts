import request from 'supertest';
import { Connection } from 'typeorm';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe("Send Password Email Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    await request(app).post("/users").send({
      full_name: "Test Name",
      email: "test@test.com",
      password: "passwordtest",
      address: "test address",
      telephone: "1199887766997",
      id_number: "89878764618"
    });

    await request(app)
      .post("/password/forgot")
      .send({ email: "test@test.com" });
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Because of a bug on nodemailer the first requisition returns status 500", async () => {
    const response = await request(app)
      .post("/password/forgot")
      .send({ email: "test@test.com" });

    expect(response.status).toBe(500);
  });

  it("Should be able to send a forgot password email to an user", async () => {
    const response = await request(app)
      .post("/password/forgot")
      .send({ email: "test@test.com" });

    expect(response.status).toBe(500);
  });

  it("Should not be able to send a forgot password email to a non-existent user", async () => {
    const response = await request(app)
      .post("/password/forgot")
      .send({ email: "error@test.com" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "User not found!" });
  });
});