import { ClientConfig, Pool } from "pg";
import { createdb, dropdb, IPgToolsConfig } from "pg-tools";
import { IPostgresTable, makeCreateTableQuery } from "./query-builder";
export * from "./query-builder";

export interface IPostgresDatabase {
  pool: Pool;

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
    this.pool.on("error", (error) => {
      console.error(error.toString());
      throw error;
    });
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

export const createDatabase = async (
  config: IPgToolsConfig,
  databaseName: string
) => {
  return new Promise((resolve, reject) => {
    createdb(config, databaseName, (error, response) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(response);
      }
    });
  });
};

export const dropDatabase = async (
  config: IPgToolsConfig,
  databaseName: string
) => {
  return new Promise((resolve, reject) => {
    dropdb(config, databaseName, (error, response) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(response);
      }
    });
  });
};

export const dangerouslyClearTables = async (database: IPostgresDatabase) => {
  const sql = `
    DROP SCHEMA public CASCADE;
    CREATE SCHEMA public;
    GRANT ALL ON SCHEMA public TO postgres;
    GRANT ALL ON SCHEMA public TO public;
  `;

  await database.query(sql);
};
