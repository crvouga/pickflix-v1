import {
  IPostgresDatabase,
  IPostgresRespository,
  IPostgresTable,
} from "../../app/data-access/database.postgres";
import { GenericRepositoryPostgres } from "../../app/data-access/generic-repository/generic-repository.postgres";
import { GenericRepositoryQueryOptions } from "../../app/data-access/generic-repository/types";
import { castJson, castTimestamp, Json, Timestamp } from "../../utils";
import { castUserId, UserId } from "../../users/models";
import {
  castTmdbDiscoverTagsId,
  TmdbDiscoverTags,
  TmdbDiscoverTagsId,
} from "../models/tmdb-discover-tags";
import { ITmdbDiscoverTagsRepository } from "./TmdbDiscoverTagsRepository";

const tableName = "tmdb_discover_tags";

type TmdbDiscoverTagsRow = {
  id: TmdbDiscoverTagsId;
  serialized_tags_by_id: Json;
  user_id: UserId;
  created_at: Timestamp;
};

const table: IPostgresTable<TmdbDiscoverTagsRow> = {
  id: {
    dataType: "TEXT",
  },
  serialized_tags_by_id: {
    dataType: "TEXT",
  },
  user_id: {
    dataType: "TEXT",
  },
  created_at: {
    dataType: "BIGINT",
  },
};

const mapEntityKeyToRowKey = (
  key: keyof TmdbDiscoverTags
): keyof TmdbDiscoverTagsRow => {
  switch (key) {
    case "id":
      return "id";

    case "serializedTagsById":
      return "serialized_tags_by_id";

    case "userId":
      return "user_id";

    case "createdAt":
      return "created_at";
  }
};

const mapPartialEntityToPartialRow = (
  entity: Partial<TmdbDiscoverTags>
): Partial<TmdbDiscoverTagsRow> => {
  return {
    id: entity.id,
    serialized_tags_by_id: entity.serializedTagsById,
    user_id: entity.userId,
    created_at: entity.createdAt,
  };
};

const mapRowToEntity = (row: TmdbDiscoverTagsRow): TmdbDiscoverTags => {
  return {
    id: castTmdbDiscoverTagsId(row.id),
    serializedTagsById: castJson(row.serialized_tags_by_id),
    userId: castUserId(row.user_id),
    createdAt: castTimestamp(row.created_at),
  };
};

export class TmdbDiscoverTagsRepositoryPostgres
  implements ITmdbDiscoverTagsRepository, IPostgresRespository {
  repository: GenericRepositoryPostgres<
    TmdbDiscoverTagsId,
    TmdbDiscoverTags,
    TmdbDiscoverTagsRow
  >;

  constructor(database: IPostgresDatabase) {
    this.repository = new GenericRepositoryPostgres<
      TmdbDiscoverTagsId,
      TmdbDiscoverTags,
      TmdbDiscoverTagsRow
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
    spec: Partial<TmdbDiscoverTags>,
    options?: GenericRepositoryQueryOptions<TmdbDiscoverTags>
  ) {
    return await this.repository.find([spec], options);
  }

  async remove(id: TmdbDiscoverTagsId) {
    await this.repository.remove([{ id }]);
  }

  async add(tmdbDiscoverTags: TmdbDiscoverTags) {
    await this.repository.add([tmdbDiscoverTags]);
  }
}
