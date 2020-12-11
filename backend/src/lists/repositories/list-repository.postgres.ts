import {
  IPostgresDatabase,
  IPostgresRespository,
  IPostgresTable,
} from "../../app/data-access/database.postgres";
import { GenericRepositoryPostgres } from "../../app/data-access/generic-repository/generic-repository.postgres";
import { GenericRepositoryQueryOptions } from "../../app/data-access/generic-repository/types";
import { castUserId } from "../../users/models";
import {
  castListDescription,
  castListId,
  castListTitle,
  List,
  ListId,
} from "../models";
import { IListRepository } from "./list-repository";
import { composeP } from "ramda";

const tableName = "lists";

type ListRow = {
  id: string;
  title: string;
  description: string;
  created_at: number;
  updated_at: number;
  owner_id: string;
};

const table: IPostgresTable<ListRow> = {
  id: "TEXT",
  title: "TEXT",
  description: "TEXT",
  created_at: "BIGINT",
  updated_at: "BIGINT",
  owner_id: "TEXT",
};

const mapEntityKeyToRowKey = (key: keyof List): keyof ListRow => {
  switch (key) {
    case "id":
      return "id";
    case "createdAt":
      return "created_at";
    case "updatedAt":
      return "updated_at";
    case "title":
      return "title";
    case "description":
      return "description";
    case "ownerId":
      return "owner_id";
    default:
      throw new Error("unsupported case");
  }
};

const mapPartialEntityToPartialRow = (
  entity: Partial<List>
): Partial<ListRow> => {
  return {
    id: entity.id,
    title: entity.title,
    description: entity.description,
    created_at: entity.createdAt,
    updated_at: entity.updatedAt,
    owner_id: entity.ownerId,
  };
};

const mapRowToEntity = (row: ListRow): List => {
  return {
    id: castListId(row.id),
    title: castListTitle(row.title),
    description: castListDescription(row.description),
    createdAt: Number(row.created_at),
    updatedAt: Number(row.updated_at),
    ownerId: castUserId(row.owner_id),
  };
};

export class ListRepositoryPostgres
  implements IListRepository, IPostgresRespository {
  repository: GenericRepositoryPostgres<ListId, List, ListRow>;

  constructor(database: IPostgresDatabase) {
    this.repository = new GenericRepositoryPostgres<ListId, List, ListRow>({
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

  async find(
    spec: Partial<List>[],
    options: GenericRepositoryQueryOptions<List>
  ) {
    return await this.repository.find(spec, options);
  }

  async add(list: List) {
    await this.repository.add([list]);
  }

  async remove(id: ListId) {
    await this.repository.remove([{ id }]);
  }

  async update(id: ListId, partial: Partial<List>) {
    await this.repository.update(id, partial);
  }

  async count(spec: Partial<List>) {
    return await this.repository.count([spec]);
  }
}
