import { RepositoryInMemory } from "../../unit-of-work/repository.in-memory";
import { ReviewVote } from "../models/make-review-vote";
import { IReviewVoteRepository } from "./types";
import { RepositoryFileSystem } from "../../unit-of-work/repository.file-system";

export class ReviewVoteRepositoryInMemory
  extends RepositoryInMemory<ReviewVote>
  implements IReviewVoteRepository {
  constructor() {
    super();
  }
}
export class ReviewVoteRepositoryFileSystem
  extends RepositoryFileSystem<ReviewVote>
  implements IReviewVoteRepository {
  constructor() {
    super("reviewVotes");
  }
}
