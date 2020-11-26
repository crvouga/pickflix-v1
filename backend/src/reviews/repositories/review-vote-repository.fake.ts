import { GenericRepositoryHashMap } from "../../common/unit-of-work/repository.hash-map";
import { ReviewVote } from "../models/make-review-vote";
import { IReviewVoteRepository } from "./types";
import { GenericRepositoryFileSystem } from "../../common/unit-of-work/repository.file-system";

export class ReviewVoteRepositoryHashMap
  extends GenericRepositoryHashMap<ReviewVote>
  implements IReviewVoteRepository {
  constructor() {
    super();
  }
}
export class ReviewVoteRepositoryFileSystem
  extends GenericRepositoryFileSystem<ReviewVote>
  implements IReviewVoteRepository {
  constructor() {
    super("reviewVotes");
  }
}
