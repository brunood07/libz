import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1638796514903 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true
          },
          {
            name: "full_name",
            type: "varchar"
          },
          {
            name: "email",
            type: "varchar"
          },
          {
            name: "password",
            type: "varchar"
          },
          {
            name: "address",
            type: "varchar"
          },
          {
            name: "telephone",
            type: "varchar"
          },
          {
            name: "id_number",
            type: "varchar"
          },
          {
            name: "isAdmin",
            type: "boolean",
            default: false
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()"
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }

}
