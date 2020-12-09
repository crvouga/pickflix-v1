import { makeId } from "../../id";
import {
  IPostgresDatabase,
  IPostgresRespository,
  IPostgresTable,
} from "../database.postgres";
import { GenericRepositoryPostgres } from "./generic-repository.postgres";

type Color = "red" | "blue" | "green" | "yellow";

const castColor = (color: any): Color => {
  if (
    typeof color === "string" &&
    (color === "red" ||
      color === "blue" ||
      color === "green" ||
      color === "yellow")
  ) {
    return color;
  }
  throw new Error("failed to cast color");
};

type Id = string;

type Foo = {
  type: "foo";
  id: Id;
  name: string;
  favoriteColor: Color;
};

export const makeFooArbitrary = (overrides?: Partial<Foo>): Foo => {
  return {
    type: "foo",
    id: makeId(),
    name: "bar baz",
    favoriteColor: "yellow",
    ...overrides,
  };
};

type FooRow = {
  id: string;
  name: string;
  favorite_color: string;
};

const tableName = "foos";

const table: IPostgresTable<FooRow> = {
  id: "TEXT",
  name: "TEXT",
  favorite_color: "TEXT",
};

const mapPartialEntityToPartialRow = (
  entity: Partial<Foo>
): Partial<FooRow> => {
  return {
    id: entity.id,
    name: entity.name,
    favorite_color: entity.favoriteColor,
  };
};

const mapRowToEntity = (row: FooRow): Foo => {
  return {
    type: "foo",
    id: row.id,
    favoriteColor: castColor(row.favorite_color),
    name: row.name,
  };
};

const mapEntityKeyToRowKey = (key: keyof Foo): keyof FooRow => {
  switch (key) {
    case "favoriteColor":
      return "favorite_color";
    case "id":
      return "id";
    case "name":
      return "name";
    default:
      throw new Error("unsupported case");
  }
};

export class FooRepositoryPostgres
  extends GenericRepositoryPostgres<Id, Foo, FooRow>
  implements IPostgresRespository {
  constructor(database: IPostgresDatabase) {
    super({
      database,
      tableName,
      mapPartialEntityToPartialRow,
      mapRowToEntity,
      mapEntityKeyToRowKey,
    });
  }

  async initializeTables() {
    await this.database.createTableIfDoesNotExists(tableName, table);
  }
}
