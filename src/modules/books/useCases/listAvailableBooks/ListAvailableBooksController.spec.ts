import { app } from "@shared/infra/http/app";
import request from "supertest";
import { Connection, createConnection } from "typeorm"

let connection: Connection

describe("List available book controller", () => {

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  })

  it("It should be able to list all available", async () => {
    await request(app).post("/books").send({
      book_name: "Test Book Name",
      author: "Test Author",
      category: "Test Category",
      photo_url: "Test link",
      number_of_pages: "200",
      publishing_company: "Test publisher",
      isbn: "123456789",
      release_year: 2021
    });

    const response = await request(app).get("/books/available");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].book_name).toEqual("Test Book Name");
    expect(response.body[0].isbn).toEqual("123456789");
  });
});