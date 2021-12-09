import { hash } from "bcryptjs";
import dayjs from "dayjs";
import request, { Response } from 'supertest';
import { Connection, createConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";

let connection: Connection;
let responseToken: Response;
let responseBook: Response
let add168Hours: Date;
let add10Hours: Date;

describe("Create Rent Controller", () => {

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
    add10Hours = dayjs().add(10, "h").toDate();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create a new rent", async () => {
    const response = await request(app)
      .post("/rents")
      .send({ book_id: `${responseBook.body.id}`, expected_return_date: add168Hours })
      .set({ Authorization: `Bearer ${responseToken.body.token}` });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.book_id).toEqual(responseBook.body.id);
  });

  it("Should not be able to create a new rent if user already have an open rent", async () => {
    const responseNewBook = await request(app).post("/books").send({
      book_name: "Test Book Name 2",
      author: "Test Author 2",
      category: "Test Category 2",
      photo_url: "Test link 2",
      number_of_pages: "300",
      publishing_company: "Test publisher2",
      isbn: "123456789987654",
      release_year: 2021
    });

    const response = await request(app)
      .post("/rents")
      .send({ book_id: `${responseNewBook.body.id}`, expected_return_date: add168Hours })
      .set({ Authorization: `Bearer ${responseToken.body.token}` });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "There is a rent in progress for this user!" });
  });

  it("Should not be able to create a new rent if the book has already an open rent", async () => {
    await request(app).post("/users").send({
      full_name: "Test Name",
      email: "test@test.com",
      password: "passwordtest",
      address: "test address",
      telephone: "1199887766997",
      id_number: "89878764618"
    });

    const responseNewToken = await request(app)
      .post("/sessions")
      .send({ email: "test@test.com", password: "passwordtest" });

    const response = await request(app)
      .post("/rents")
      .send({ book_id: `${responseBook.body.id}`, expected_return_date: add168Hours })
      .set({ Authorization: `Bearer ${responseNewToken.body.token}` });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Book is unavailable!" });
  });

  it("Should not be able to create a new rent with an invalid return time", async () => {
    const responseNewBook = await request(app).post("/books").send({
      book_name: "Test Book Name 2",
      author: "Test Author 2",
      category: "Test Category 2",
      photo_url: "Test link 2",
      number_of_pages: "300",
      publishing_company: "Test publisher2",
      isbn: "123456789987654",
      release_year: 2021
    });

    await request(app).post("/users").send({
      full_name: "Test Name",
      email: "test@test.com",
      password: "passwordtest",
      address: "test address",
      telephone: "1199887766997",
      id_number: "89878764618"
    });

    const responseNewToken = await request(app)
      .post("/sessions")
      .send({ email: "test@test.com", password: "passwordtest" });

    const response = await request(app)
      .post("/rents")
      .send({ book_id: `${responseNewBook.body.id}`, expected_return_date: add10Hours })
      .set({ Authorization: `Bearer ${responseNewToken.body.token}` });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Invalid return time!" });
  });
});