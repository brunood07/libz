import { hash } from "bcryptjs";
import dayjs from "dayjs";
import request, { Response } from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";

let connection: Connection;
let responseToken: Response;
let responseBook: Response;
let responseRent: Response;
let add168Hours: Date;

describe("Devolution Rent Controller", () => {
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

    responseToken = await request(app)
      .post("/sessions")
      .send({ email: "admin@libz.com", password: "admin" });

    responseBook = await request(app).post("/books").send({
      book_name: "Test Book Name",
      author: "Test Author",
      category: "Test Category",
      photo_url: "Test link",
      number_of_pages: "200",
      publishing_company: "Test publisher",
      isbn: "123456789",
      release_year: 2021
    });

    add168Hours = dayjs().add(168, "h").toDate();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to return a rent", async () => {
    responseRent = await request(app)
      .post("/rents")
      .send({ book_id: `${responseBook.body.id}`, expected_return_date: add168Hours })
      .set({ Authorization: `Bearer ${responseToken.body.token}` });

    const response = await request(app)
      .post(`/rents/devolution/${responseRent.body.id}`)
      .set({ Authorization: `Bearer ${responseToken.body.token}` });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("end_date");
    expect(responseBook.body.available).toBe(true);
  });

  it("Should not be able to return a non-existent rent", async () => {
    const response = await request(app)
      .post("/rents/devolution/321456")
      .set({ Authorization: `Bearer ${responseToken.body.token}` });

    expect(response.body).toEqual({ message: "Rent does not exists!" });
    expect(response.status).toBe(400);
  });

  it("Should be able to apply a fee for delaying a return", async () => {
    responseRent = await request(app)
      .post("/rents")
      .send({
        book_id: `${responseBook.body.id}`,
        expected_return_date: add168Hours,
      }).set({ Authorization: `Bearer ${responseToken.body.token}` });

    const response = await request(app)
      .post(`/rents/devolution/${responseRent.body.id}`)
      .set({ Authorization: `Bearer ${responseToken.body.token}` })

    expect(response.status).toBe(200);
    expect(response.body.total).toBe(0);
  });
});