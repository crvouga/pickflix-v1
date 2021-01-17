import {
  IPostgresDatabase,
  IPostgresRespository,
  IPostgresTable,
} from "../../app/persistence/repository/postgres/database.postgres";
import { GenericRepositoryPostgres } from "../../app/persistence/repository/postgres/generic-repository.postgres";
import { GenericRepositoryQueryOptions } from "../../app/persistence/repository/types";
import { castTimestamp, Timestamp } from "../../utils";
import {
  deserializeMediaId,
  SerializedMediaId,
  serializeMediaId,
} from "../../media/models/types";
import { castUserId, UserId } from "../../users/models";
import {
  castReviewContent,
  castReviewId,
  castReviewRating,
  Review,
  ReviewContent,
  ReviewId,
  ReviewRating,
} from "../models/make-review";
import { IReviewRepository } from "./review-repository";

const tableName = "reviews";

type ReviewRow = {
  id: ReviewId;
  author_id: UserId;
  content: ReviewContent;
  rating: ReviewRating;
  media_id: SerializedMediaId;
  created_at: Timestamp;
  updated_at: Timestamp;
};

const table: IPostgresTable<ReviewRow> = {
  id: {
    dataType: "TEXT",
  },
  author_id: {
    dataType: "TEXT",
  },
  content: {
    dataType: "TEXT",
  },
  rating: {
    dataType: "BIGINT",
  },
  media_id: {
    dataType: "TEXT",
  },
  created_at: {
    dataType: "BIGINT",
  },
  updated_at: {
    dataType: "BIGINT",
  },
};

const mapEntityKeyToRowKey = (key: keyof Review): keyof ReviewRow => {
  switch (key) {
    case "authorId":
      return "author_id";
    case "content":
      return "content";
    case "createdAt":
      return "created_at";
    case "updatedAt":
      return "updated_at";
    case "rating":
      return "rating";
    case "id":
      return "id";
    default:
      throw new Error("unsupported case");
  }
};

const mapPartialEntityToPartialRow = (
  entity: Partial<Review>
): Partial<ReviewRow> => {
  return {
    id: entity.id,
    author_id: entity.authorId,
    content: entity.content,
    rating: entity.rating,
    media_id: entity.mediaId ? serializeMediaId(entity.mediaId) : undefined,
    created_at: entity.createdAt,
    updated_at: entity.updatedAt,
  };
};

const mapRowToEntity = (row: ReviewRow): Review => {
  return {
    id: castReviewId(row.id),
    authorId: castUserId(row.author_id),
    content: castReviewContent(row.content),
    rating: castReviewRating(row.rating),
    createdAt: castTimestamp(row.created_at),
    updatedAt: castTimestamp(row.updated_at),
    mediaId: deserializeMediaId(row.media_id),
  };
};

export class ReviewRepositoryPostgres
  implements IReviewRepository, IPostgresRespository {
  repository: GenericRepositoryPostgres<ReviewId, Review, ReviewRow>;

  constructor(database: IPostgresDatabase) {
    this.repository = new GenericRepositoryPostgres<
      ReviewId,
      Review,
      ReviewRow
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
    spec: Partial<Review>,
    options?: GenericRepositoryQueryOptions<Review>
  ) {
    return this.repository.find([spec], options);
  }

  async add(review: Review) {
    await this.repository.add([review]);
  }

  async remove(id: ReviewId) {
    await this.repository.remove([{ id }]);
  }

  async count(spec: Partial<Review>) {
    return this.repository.count([spec]);
  }

  async update(id: ReviewId, partial: Partial<Review>) {
    await this.repository.update(id, partial);
  }
}
