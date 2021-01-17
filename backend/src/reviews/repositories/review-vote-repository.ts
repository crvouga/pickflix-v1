import { GenericRepositoryFileSystem } from "../../app/persistence/generic-repository/generic-repository.file-system";
import { GenericRepositoryHashMap } from "../../app/persistence/generic-repository/generic-repository.hash-map";
import { ReviewVote, ReviewVoteId } from "../models/make-review-vote";

export interface IReviewVoteRepository {
  find(spec: Partial<ReviewVote>): Promise<ReviewVote[]>;

  add(review: ReviewVote): void;

  remove(id: ReviewVoteId): void;

  update(id: ReviewVoteId, partial: Partial<ReviewVote>): void;

  count(spec: Partial<ReviewVote>): Promise<Number>;
}

export class ReviewVoteRepositoryHashMap implements IReviewVoteRepository {
  repository: GenericRepositoryHashMap<ReviewVoteId, ReviewVote>;

  constructor(hashMap: { [id: string]: ReviewVote }) {
    this.repository = new GenericRepositoryHashMap<ReviewVoteId, ReviewVote>(
      hashMap
    );
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

export class ReviewVoteRepositoryFileSystem implements IReviewVoteRepository {
  repository: GenericRepositoryFileSystem<ReviewVoteId, ReviewVote>;

  constructor(filePath: string) {
    this.repository = new GenericRepositoryFileSystem<ReviewVoteId, ReviewVote>(
      filePath
    );
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
