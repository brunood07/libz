import dayjs from 'dayjs';
import { sign } from 'jsonwebtoken';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from "uuid";

import auth from '@config/auth';
import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe("Reset password Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to reset user password", async () => {
    await request(app).post("/users").send({
      full_name: "Test Name",
      email: "test@test.com",
      password: "passwordtest",
      address: "test address",
      telephone: "1199887766997",
      id_number: "89878764618"
    });

    const responseToken = await request(app)
      .post("/sessions")
      .send({ email: "test@test.com", password: "passwordtest" });

    const response = await request(app)
      .post(`/password/reset?token=${responseToken.body.refresh_token}`)
      .send({ password: "newpass " });

    expect(response.status).toBe(200);
  });

  it("Should not be able to reset user password with an invalid token", async () => {
    const invalidToken = sign({}, auth.secret_token, {
      subject: uuidV4(),
      expiresIn: auth.expires_in_token
    });

    const response = await request(app).post(`/password/reset?token={invalidToken}`);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Token expired!" });
  });

  it("Should not be able to reset user password with an expired token", async () => {
    await request(app).post("/users").send({
      full_name: "Test Name",
      email: "test@test.com",
      password: "passwordtest",
      address: "test address",
      telephone: "1199887766997",
      id_number: "89878764618"
    });

    const responseToken = await request(app)
      .post("/sessions")
      .send({ email: "test@test.com", password: "passwordtest" });

    const response = await request(app)
      .post(`/password/reset?token={responseToken}`)
      .send({ password: "newpass", date_now: dayjs().add(100, "day").toDate() });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Token expired!" });
  });
});