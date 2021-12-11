import request, { Response } from "supertest";
import { Connection, createConnection } from "typeorm"

import { app } from "@shared/infra/http/app";

let connection: Connection;
let responseUser: Response;
let responseToken: Response;

describe("Create book controller", () => {

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    responseUser = await request(app).post("/users").send({
      full_name: "Test Name",
      email: "admin@libz.com",
      password: "admin",
      address: "test address",
      telephone: "1199887766997",
      id_number: "89878764618",
    });

    responseToken = await request(app)
      .post("/sessions")
      .send({ email: "admin@libz.com", password: "admin" });
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  })

  it("It should be able to create a new book", async () => {
    const response = await request(app).post("/books").send({
      book_name: "Test Book Name",
      author: "Test Author",
      category: "Test Category",
      photo_url: "Test link",
      number_of_pages: "200",
      publishing_company: "Test publisher",
      isbn: "123456789",
      release_year: 2021
    }).set({ Authorization: `Bearer ${responseToken.body.token}` });

    expect(response.status).toBe(201);
  });

  it("Should not be able to create a book with a isbn that already exists", async () => {
    const response = await request(app).post("/books").send({
      book_name: "Test Book Name",
      author: "Test Author",
      category: "Test Category",
      photo_url: "Test link",
      number_of_pages: "200",
      publishing_company: "Test publisher",
      isbn: "123456789",
      release_year: 2021
    }).set({ Authorization: `Bearer ${responseToken.body.token}` });

    expect(response.status).toBe(400);
  });
});