import { RepositoryHashMap } from "../../common/unit-of-work/repository.hash-map";
import { ReviewVote } from "../models/make-review-vote";
import { IReviewVoteRepository } from "./types";
import { RepositoryFileSystem } from "../../common/unit-of-work/repository.file-system";

export class ReviewVoteRepositoryHashMap
  extends RepositoryHashMap<ReviewVote>
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
