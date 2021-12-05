import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateBooks1638539253013 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "books",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true
          },
          {
            name: "book_name",
            type: "varchar"
          },
          {
            name: "author",
            type: "varchar"
          },
          {
            name: "category",
            type: "varchar"
          },
          {
            name: "photo_url",
            type: "varchar"
          },
          {
            name: "number_of_pages",
            type: "varchar"
          },
          {
            name: "available",
            type: "boolean",
            default: true
          },
          {
            name: "isbn",
            type: "varchar"
          },
          {
            name: "release_year",
            type: "numeric",
          },
          {
            name: "publishing_company",
            type: "varchar"
          }
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("books");
  }
}
