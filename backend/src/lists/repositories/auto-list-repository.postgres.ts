import {
  IPostgresDatabase,
  IPostgresRespository,
  IPostgresTable,
} from "../../app/data-access/database.postgres";
import { GenericRepositoryPostgres } from "../../app/data-access/generic-repository/generic-repository.postgres";
import { castUserId } from "../../users/models";
import { AutoList, castAutoListKey, castListId, ListId } from "../models";
import { IAutoListRepository } from "./auto-list-repository";

const tableName = "auto_lists";

type AutoListRow = {
  id: string;
  auto_list_key: string;
  owner_id: string;
};

const table: IPostgresTable<AutoListRow> = {
  id: "TEXT",
  auto_list_key: "TEXT",
  owner_id: "TEXT",
};

const mapEntityKeyToRowKey = (key: keyof AutoList): keyof AutoListRow => {
  switch (key) {
    case "id":
      return "id";
    case "key":
      return "auto_list_key";
    case "ownerId":
      return "owner_id";
    default:
      throw new Error("unsupported case");
  }
};

const mapPartialEntityToPartialRow = (
  entity: Partial<AutoList>
): Partial<AutoListRow> => {
  return {
    id: entity.id,
    auto_list_key: entity.key,
    owner_id: entity.ownerId,
  };
};

const mapRowToEntity = (row: AutoListRow): AutoList => {
  return {
    id: castListId(row.id),
    key: castAutoListKey(row.auto_list_key),
    ownerId: castUserId(row.owner_id),
  };
};

export class AutoListRepositoryPostgres
  implements IAutoListRepository, IPostgresRespository {
  repository: GenericRepositoryPostgres<ListId, AutoList, AutoListRow>;

  constructor(database: IPostgresDatabase) {
    this.repository = new GenericRepositoryPostgres<
      ListId,
      AutoList,
      AutoListRow
    >({
      database,
      tableName,
      mapEntityKeyToRowKey,
      mapPartialEntityToPartialRow,
      mapRowToEntity,
    });
  }

  async initializeTables() {
    await this.repository.database.createTableIfDoesNotExists(tableName, table);
  }

  async find(spec: Partial<AutoList>) {
    return await this.repository.find([spec]);
  }

  async add(autoList: AutoList) {
    await this.repository.add([autoList]);
  }

  async count(spec: Partial<AutoList>) {
    return await this.repository.count([spec]);
  }
}
