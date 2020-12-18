import { IPostgresTable, PostgresDatabase } from "./database.postgres";

const tableName = "foo";

type FooRow = {
  id: string;
  favorite_color: string;
};

const table: IPostgresTable<FooRow> = {
  id: {
    dataType: "TEXT",
  },
  favorite_color: {
    dataType: "TEXT",
  },
};

describe("postgres database", () => {
  it("creates tables and checks if they exists", async () => {
    const database = new PostgresDatabase({});

    expect(await database.doesTableExists(tableName)).toEqual(false);

    await database.createTable(tableName, table);

    expect(await database.doesTableExists(tableName)).toEqual(true);

    await database.query(`DROP TABLE ${tableName}`);

    expect(await database.doesTableExists(tableName)).toEqual(false);
  });
});
