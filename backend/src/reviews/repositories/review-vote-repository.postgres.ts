import {
  IPostgresDatabase,
  IPostgresRespository,
  IPostgresTable,
} from "../../app/data-store/repository/postgres/database.postgres";
import { GenericRepositoryPostgres } from "../../app/data-store/repository/postgres/generic-repository.postgres";
import { castUserId, UserId } from "../../users/models";
import { castReviewId, ReviewId } from "../models/make-review";
import {
  castReviewVoteId,
  castReviewVoteValue,
  ReviewVote,
  ReviewVoteId,
  ReviewVoteValue,
} from "../models/make-review-vote";
import { IReviewVoteRepository } from "./review-vote-repository";

const tableName = "review_votes";

type ReviewVoteRow = {
  id: ReviewVoteId;
  user_id: UserId;
  review_id: ReviewId;
  vote_value: ReviewVoteValue;
};

const table: IPostgresTable<ReviewVoteRow> = {
  id: {
    dataType: "TEXT",
  },
  user_id: {
    dataType: "TEXT",
  },
  review_id: {
    dataType: "TEXT",
  },
  vote_value: {
    dataType: "TEXT",
  },
};

const mapEntityKeyToRowKey = (key: keyof ReviewVote): keyof ReviewVoteRow => {
  switch (key) {
    case "id":
      return "id";
    case "reviewId":
      return "review_id";
    case "userId":
      return "user_id";
    case "voteValue":
      return "vote_value";
    default:
      throw new Error("unsupported case");
  }
};

const mapPartialEntityToPartialRow = (
  entity: Partial<ReviewVote>
): Partial<ReviewVoteRow> => {
  return {
    id: entity.id,
    user_id: entity.userId,
    vote_value: entity.voteValue,
    review_id: entity.reviewId,
  };
};

const mapRowToEntity = (row: ReviewVoteRow): ReviewVote => {
  return {
    id: castReviewVoteId(row.id),
    voteValue: castReviewVoteValue(row.vote_value),
    userId: castUserId(row.user_id),
    reviewId: castReviewId(row.review_id),
  };
};

export class ReviewVoteRepositoryPostgres
  implements IReviewVoteRepository, IPostgresRespository {
  repository: GenericRepositoryPostgres<
    ReviewVoteId,
    ReviewVote,
    ReviewVoteRow
  >;

  constructor(database: IPostgresDatabase) {
    this.repository = new GenericRepositoryPostgres<
      ReviewVoteId,
      ReviewVote,
      ReviewVoteRow
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

  async find(spec: Partial<ReviewVote>) {
    return this.repository.find([spec]);
  }

  async add(reviewVote: ReviewVote) {
    await this.repository.add([reviewVote]);
  }

  async remove(id: ReviewVoteId) {
    await this.repository.remove([{ id }]);
  }

  async count(spec: Partial<ReviewVote>) {
    return this.repository.count([spec]);
  }

  async update(id: ReviewVoteId, partial: Partial<ReviewVote>) {
    await this.repository.update(id, partial);
  }
}
