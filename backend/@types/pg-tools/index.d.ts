declare module "pg-tools" {
  //SOURCE: https://kb.objectrocket.com/postgresql/how-to-create-a-postgres-database-with-nodejs-844
  export type IPgToolsConfig = {
    user: string;
    host: string;
    password?: string;
    port: number | string;
  };

  type IPgToolsError = any;

  type IPgToolsResponse = {
    command: string;
    rowCount: number;
    oid: string | null;
    rows: Array<any>;
    fields: Array<string>;
    _parsers: Array<any>;
    RowCtor: any;
    rowAsArray: boolean;
    _getTypeParser: Function;
  };

  export type IPgToolsCallback = (
    err: IPgToolsError,
    response: IPgToolsResponse
  ) => void;

  export function createdb(
    config: IPgToolsConfig,
    databaseName: string,
    callback: IPgToolsCallback
  ): void;

  export function dropdb(
    config: IPgToolsConfig,
    databaseName: string,
    callback: IPgToolsCallback
  ): void;
}
