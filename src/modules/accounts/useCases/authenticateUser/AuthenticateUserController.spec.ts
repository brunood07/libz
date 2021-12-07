import { hash } from "bcryptjs";
import request from "supertest";
import { Connection, createConnection } from "typeorm"
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";

let connection: Connection

describe("Authenticate user controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO USERS(id, full_name, email, password, "isAdmin", address, id_number, telephone)
                values('${id}', 'admin', 'admin@libz.com', '${password}', 'true', 'rua xxx', 'XXXXXX', 'xxxx')
            `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to authenticate a user", async () => {
    const response = await request(app).post("/sessions").send({
      email: "admin@libz.com",
      password: "admin"
    });

    expect(response.body.user.name).toEqual("admin");
    expect(response.body.user.email).toEqual("admin@libz.com");
    expect(response.body).toHaveProperty("token");
  });

  it("Should not be able to authenticate a user with an incorrect email", async () => {
    const response = await request(app).post("/sessions").send({
      email: "error@test.com",
      password: "admin"
    });

    expect(response.status).toBe(400);
  });

  it("Should not be able to authenticate a user with an incorrect password", async () => {
    const response = await request(app).post("/sessions").send({
      email: "admin@libz.com",
      password: "wrongpass"
    });

    expect(response.status).toBe(400);
  });
});