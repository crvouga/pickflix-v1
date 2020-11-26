import { GenericRepositoryHashMap } from "../../common/unit-of-work/repository.hash-map";
import { ReviewVote, ReviewVoteId } from "../models/make-review-vote";
import { GenericRepositoryFileSystem } from "../../common/unit-of-work/repository.file-system";

export interface IReviewVoteRepository {
  add(review: ReviewVote): void;

  remove(id: ReviewVoteId): void;

  update(id: ReviewVoteId, partial: Partial<ReviewVote>): void;

  count(spec: Partial<ReviewVote>): Promise<Number>;
}

export class ReviewVoteRepositoryHashMap implements IReviewVoteRepository {
  repository: GenericRepositoryHashMap<ReviewVote>;

  constructor(repository: GenericRepositoryHashMap<ReviewVote>) {
    this.repository = repository;
  }

  async add(review: ReviewVote) {
    this.repository.add([review]);
  }

  async remove(id: ReviewVoteId) {
    this.repository.remove([{ id }]);
  }

  async count(spec: Partial<ReviewVote>) {
    return this.repository.count(spec);
  }

  async update(id: ReviewVoteId, partial: Partial<ReviewVote>) {
    this.repository.update({ id, ...partial });
  }
}

export class ReviewVoteRepositoryFileSystem implements IReviewVoteRepository {
  repository: GenericRepositoryFileSystem<ReviewVote>;

  constructor(repository: GenericRepositoryFileSystem<ReviewVote>) {
    this.repository = repository;
  }

  async add(review: ReviewVote) {
    this.repository.add([review]);
  }

  async remove(id: ReviewVoteId) {
    this.repository.remove([{ id }]);
  }

  async count(spec: Partial<ReviewVote>) {
    return this.repository.count(spec);
  }

  async update(id: ReviewVoteId, partial: Partial<ReviewVote>) {
    this.repository.update({ id, ...partial });
  }
}
