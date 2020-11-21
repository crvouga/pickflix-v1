import { IRepository } from "../../common/unit-of-work/types";
import { Review } from "../models/make-review";
import { ReviewVote } from "../models/make-review-vote";

export interface IReviewRepository extends IRepository<Review> {}
export interface IReviewVoteRepository extends IRepository<ReviewVote> {}
