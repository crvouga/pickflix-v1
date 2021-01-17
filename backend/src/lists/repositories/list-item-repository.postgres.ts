import {
  IPostgresDatabase,
  IPostgresRespository,
  IPostgresTable,
} from "../../app/persistence/postgres/database.postgres";
import { GenericRepositoryPostgres } from "../../app/persistence/generic-repository/generic-repository.postgres";
import { GenericRepositoryQueryOptions } from "../../app/persistence/generic-repository/types";
import { castTimestamp, Timestamp } from "../../utils";
import {
  deserializeMediaId,
  SerializedMediaId,
  serializeMediaId,
} from "../../media/models/types";
import { castUserId, UserId } from "../../users/models";
import {
  castListId,
  castListItemId,
  ListId,
  ListItem,
  ListItemId,
} from "../models";
import { IListItemRepository } from "./list-item-repository";

const tableName = "list_items";

type ListItemRow = {
  id: ListItemId;
  user_id: UserId;
  list_id: ListId;
  created_at: Timestamp;
  media_id: SerializedMediaId;
};

const table: IPostgresTable<ListItemRow> = {
  id: {
    dataType: "TEXT",
  },
  user_id: {
    dataType: "TEXT",
  },
  list_id: {
    dataType: "TEXT",
  },
  created_at: {
    dataType: "BIGINT",
  },
  media_id: {
    dataType: "TEXT",
  },
};

const mapEntityKeyToRowKey = (key: keyof ListItem): keyof ListItemRow => {
  switch (key) {
    case "id":
      return "id";
    case "createdAt":
      return "created_at";
    case "listId":
      return "list_id";
    case "userId":
      return "user_id";
    default:
      throw new Error("unsupported case");
  }
};

const mapPartialEntityToPartialRow = (
  entity: Partial<ListItem>
): Partial<ListItemRow> => {
  return {
    id: entity.id,
    list_id: entity.listId,
    user_id: entity.userId,
    created_at: entity.createdAt,
    media_id: entity.mediaId ? serializeMediaId(entity.mediaId) : undefined,
  };
};

const mapRowToEntity = (row: ListItemRow): ListItem => {
  return {
    id: castListItemId(row.id),
    listId: castListId(row.list_id),
    userId: castUserId(row.user_id),
    mediaId: deserializeMediaId(row.media_id),
    createdAt: castTimestamp(row.created_at),
  };
};

export class ListItemRepositoryPostgres
  implements IListItemRepository, IPostgresRespository {
  repository: GenericRepositoryPostgres<ListItemId, ListItem, ListItemRow>;

  constructor(database: IPostgresDatabase) {
    this.repository = new GenericRepositoryPostgres<
      ListItemId,
      ListItem,
      ListItemRow
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

  async find(
    spec: Partial<ListItem>[],
    options: GenericRepositoryQueryOptions<ListItem>
  ) {
    return await this.repository.find(spec, options);
  }

  async count(spec: Partial<ListItem>[]) {
    return this.repository.count(spec);
  }

  async add(listItems: ListItem[]) {
    await this.repository.add(listItems);
  }

  async remove(id: ListItemId) {
    await this.repository.remove([{ id }]);
  }

  async removeWhere(specs: Partial<ListItem>[]) {
    await this.repository.remove(specs);
  }
}
