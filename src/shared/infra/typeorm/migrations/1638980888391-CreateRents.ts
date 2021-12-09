import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRents1638980888391 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "rents",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true
                    },
                    {
                        name: "book_id",
                        type: "varchar"
                    },
                    {
                        name: "user_id",
                        type: "varchar"
                    },
                    {
                        name: "start_date",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "end_date",
                        type: "timestamp",
                        isNullable: true
                    },
                    {
                        name: "expected_return_date",
                        type: "timestamp"
                    },
                    {
                        name: "total",
                        type: "numeric",
                        isNullable: true
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKBookRent",
                        referencedTableName: "books",
                        referencedColumnNames: ["id"],
                        columnNames: ["book_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                    {
                        name: "FKUserRent",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("rents");
    }

}
