import { app } from "@shared/infra/http/app";
import request from "supertest";
import { Connection, createConnection } from "typeorm"

let connection: Connection

describe("Create book controller", () => {

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
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
    });

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
    });

    expect(response.status).toBe(400);
  });
});