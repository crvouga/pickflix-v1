import Knex from "knex";

export const queryBuilder = Knex({
  client: "pg",
});

export type PostgresDataType = "TEXT" | "BIGINT";

export type IPostgresTable<Row> = {
  [key in keyof Row]: {
    dataType: PostgresDataType;
  };
};

export const makeCreateTableQuery = <Row>(
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
