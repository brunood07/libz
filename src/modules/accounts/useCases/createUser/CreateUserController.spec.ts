import { app } from "@shared/infra/http/app";
import request from "supertest";
import { Connection, createConnection } from "typeorm"

let connection: Connection

describe("Create user controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create a new user", async () => {
    const response = await request(app).post("/users").send({
      full_name: "Test Name",
      email: "test@test.com",
      password: "passwordtest",
      address: "test address",
      telephone: "1199887766997",
      id_number: "89878764618"
    });

    expect(response.status).toBe(201);
  });

  it("Should not be able to create a user with an already registered email!", async () => {
    const response = await request(app).post("/users").send({
      full_name: "Test Name",
      email: "test@test.com",
      password: "passwordtest",
      address: "test address",
      telephone: "1199887766997",
      id_number: "89878764618"
    });

    expect(response.status).toBe(400);
  })
})