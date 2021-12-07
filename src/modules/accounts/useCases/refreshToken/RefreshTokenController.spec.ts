import { hash } from "bcryptjs";
import request from "supertest";
import { Connection, createConnection } from "typeorm"
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";

let connection: Connection

describe("Refresh token controller", () => {
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

  it("Should be able to refresh a token", async () => {
    const response = await request(app).post("/sessions").send({
      email: "admin@libz.com",
      password: "admin"
    });

    const refresh_token = response.body.refresh_token;

    const result = await request(app).post("/refresh-token").send({
      token: refresh_token
    });

    expect(result.body).toHaveProperty("token");
    expect(result.body).toHaveProperty("refresh_token");
    expect(result.status).toBe(200);
  });

  it("Should not be able to refresh a token with an invalid or expired refresh token", async () => {
    const result = await request(app).post("/refresh-token").send({
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJydW5vb2QwN0BnbWFpbC5jb20iLCJpYXQiOjE2Mzg4ODU4NjUsImV4cCI6MTY0MTQ3Nzg2NSwic3ViIjoiZDc1YzhmMmQtNjU4My00ZjFlLThiNWQtZTIyMTI2NjdhMDkwIn0.YYQnZUYLP84_uwH42DfUT7e5j1vKIwJSIII9lctr0hI"
    });

    expect(result.status).toBe(400);
  })
})