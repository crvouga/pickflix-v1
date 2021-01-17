declare module "pg-tools" {
  //SOURCE: https://kb.objectrocket.com/postgresql/how-to-create-a-postgres-database-with-nodejs-844
  export type IPgToolsConfig = {
    user: string;
    host: string;
    password?: string;
    port: number | string;
  };

  type IError = unknown;

  type IResponse = {
    command: string;
    rowCount: number;
    oid: string | null;
    rows: Array<unknown>;
    fields: Array<string>;
    _parsers: Array<unknown>;
    RowCtor: unknown;
    rowAsArray: boolean;
    _getTypeParser: Function;
  };

  type ICallback = (err: IError, response: IResponse) => void;

  function createdb(
    config: IPgToolsConfig,
    databaseName: string,
    callback: ICallback
  ): void;

  function dropdb(
    config: IPgToolsConfig,
    databaseName: string,
    callback: ICallback
  ): void;

  export = {
    createdb,
    dropdb,
  };
}
