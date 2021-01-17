import {
  IPostgresDatabase,
  IPostgresRespository,
  IPostgresTable,
} from "../../app/persistence/repository/postgres/database.postgres";
import { GenericRepositoryPostgres } from "../../app/persistence/repository/postgres/generic-repository.postgres";
import { GenericRepositoryQueryOptions } from "../../app/persistence/repository/types";
import {
  castJson,
  castTimestamp,
  Json,
  Timestamp,
  castNonEmptyString,
} from "../../utils";
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
  tags_by_id: Json;
  key: string;
  user_id: UserId;
  created_at: Timestamp;
};

const table: IPostgresTable<TmdbDiscoverTagsRow> = {
  id: {
    dataType: "TEXT",
  },
  tags_by_id: {
    dataType: "TEXT",
  },
  key: {
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

    case "tagsById":
      return "tags_by_id";

    case "key":
      return "key";

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
    tags_by_id: entity.tagsById,
    key: entity.key,
    user_id: entity.userId,
    created_at: entity.createdAt,
  };
};

const mapRowToEntity = (row: TmdbDiscoverTagsRow): TmdbDiscoverTags => {
  return {
    id: castTmdbDiscoverTagsId(row.id),
    tagsById: castJson(row.tags_by_id),
    key: castNonEmptyString(row.key),
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
