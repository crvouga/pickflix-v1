import {
  IPostgresDatabase,
  IPostgresRespository,
  IPostgresTable,
} from "../../app/data-access/database.postgres";
import { GenericRepositoryPostgres } from "../../app/data-access/generic-repository/generic-repository.postgres";
import { castUserId } from "../../users/models";
import { castReviewId } from "../models/make-review";
import {
  castReviewVoteId,
  castReviewVoteValue,
  ReviewVote,
  ReviewVoteId,
} from "../models/make-review-vote";
import { IReviewVoteRepository } from "./review-vote-repository";

const tableName = "review_votes";

type ReviewVoteRow = {
  id: string;
  user_id: string;
  review_id: string;
  vote_value: string;
};

const table: IPostgresTable<ReviewVoteRow> = {
  id: "TEXT",
  user_id: "TEXT",
  review_id: "TEXT",
  vote_value: "TEXT",
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