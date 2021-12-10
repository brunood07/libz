import { hash } from "bcryptjs";
import dayjs from "dayjs";
import { Connection, createConnection } from "typeorm";
import request, { Response } from "supertest";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";

let connection: Connection;
let responseAdminToken: Response;
let responseBook: Response;
let responseRent: Response;

describe("List rents by user controller", () => {
  const bookTest = {
    book_name: "Test Book Name",
    author: "Test Author",
    category: "Test Category",
    photo_url: "Test link",
    number_of_pages: "200",
    publishing_company: "Test publisher",
    isbn: "123456789",
    release_year: 2021
  };

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash('admin', 8);

    await connection.query(
      `
      INSERT INTO USERS(id, full_name, email, password, "isAdmin", address, id_number, telephone)
      values('${id}', 'admin', 'admin@libz.com', '${password}', 'true', 'rua xxx', 'XXXXXX', 'xxxx')
      `
    );

    const dayAdd168Hours = dayjs().add(7, "day").toDate();

    responseAdminToken = await request(app)
      .post("/sessions")
      .send({ email: "admin@libz.com", password: "admin" });

    responseBook = await request(app)
      .post("/books")
      .send({ ...bookTest })
      .set({ Authorization: `Bearer ${responseAdminToken.body.token}` });

    responseRent = await request(app)
      .post("/rents")
      .send({ book_id: responseBook.body.id, expected_return_date: dayAdd168Hours })
      .set({ Authorization: `Bearer ${responseAdminToken.body.token}` });

    await request(app)
      .post(`/rents/devolution/${responseRent.body.id}`)
      .set({ Authorization: `Bearer ${responseAdminToken.body.token}` });

    await request(app)
      .post("/rents")
      .send({ book_id: responseBook.body.id, expected_return_date: dayAdd168Hours })
      .set({ Authorization: `Bearer ${responseAdminToken.body.token}` });
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to list list all rents by an user", async () => {
    const response = await request(app)
      .get("/rents/user")
      .set({ Authorization: `Bearer ${responseAdminToken.body.token}` });

    expect(response.status).toBe(200);
  });
});