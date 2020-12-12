import Knex from "knex";
import { ClientConfig, Pool } from "pg";
import configuration from "../configuration";

export const queryBuilder = Knex({
  client: "pg",
});

export type PostgresDataType = "TEXT" | "BIGINT";

export type IPostgresTable<Row> = {
  [key in keyof Row]: {
    dataType: PostgresDataType;
  };
};

const makeCreateTableQuery = <Row>(
  tableName: string,
  tableSpec: IPostgresTable<Row>
): string => {
  return queryBuilder.schema
    .createTable(tableName, (tableBuilder) => {
      for (const columnName in tableSpec) {
        const dataType: PostgresDataType = tableSpec[columnName].dataType;
        switch (dataType) {
          case "BIGINT":
            tableBuilder.bigInteger(String(columnName));
            break;
          case "TEXT":
            tableBuilder.text(String(columnName));
            break;
        }
      }
    })
    .toQuery();
};

export interface IPostgresDatabase {
  query<Row>(sql: string): Promise<Row[]>;

  doesTableExists(tableName: string): Promise<boolean>;

  createTable<Row>(
    tableName: string,
    table: IPostgresTable<Row>
  ): Promise<void>;

  createTableIfDoesNotExists<Row>(
    tableName: string,
    table: IPostgresTable<Row>
  ): Promise<void>;
}

export interface IPostgresRespository {
  initializeTables(): Promise<void>;
}

export class PostgresDatabase implements IPostgresDatabase {
  pool: Pool;

  constructor(config: ClientConfig) {
    this.pool = new Pool(config);
  }

  async query<Row>(sql: string) {
    const response = await this.pool.query<Row>(sql);
    return response.rows;
  }

  async createTable<Row>(tableName: string, table: IPostgresTable<Row>) {
    const sql = makeCreateTableQuery(tableName, table);

    await this.query(sql);
  }

  async doesTableExists(tableName: string) {
    const rows = await this.query<{ to_regclass: null | unknown }>(
      `SELECT to_regclass('${tableName}')`
    );
    const doesExists = Boolean(rows[0].to_regclass);

    return doesExists;
  }

  async createTableIfDoesNotExists<Row>(
    tableName: string,
    table: IPostgresTable<Row>
  ) {
    const doesExists = await this.doesTableExists(tableName);
    if (!doesExists) {
      await this.createTable(tableName, table);
    }
  }
}

export class PostgresDatabaseTest extends PostgresDatabase {
  constructor() {
    super(configuration.PG_CLIENT_CONFIGS.test);
  }

  async clearTables() {
    const sql = `
      DROP SCHEMA public CASCADE;
      CREATE SCHEMA public;
      GRANT ALL ON SCHEMA public TO postgres;
      GRANT ALL ON SCHEMA public TO public;
    `;

    await this.query(sql);
  }
}

export class PostgresDatabaseDeveloplment extends PostgresDatabase {
  constructor() {
    super(configuration.PG_CLIENT_CONFIGS.development);
  }
  async clearTables() {
    const sql = `
      DROP SCHEMA public CASCADE;
      CREATE SCHEMA public;
      GRANT ALL ON SCHEMA public TO postgres;
      GRANT ALL ON SCHEMA public TO public;
    `;
    await this.query(sql);
  }
}

export class PostgresDatabaseProduction extends PostgresDatabase {
  constructor() {
    super(configuration.PG_CLIENT_CONFIGS.production);
  }
}
