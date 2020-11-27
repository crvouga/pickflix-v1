import { buildMediaLogicTest } from "../../media/logic/build";
import { UserRepositoryHashMap } from "../../users/repositories/user-repository";
import { ReviewRepositoryHashMap } from "../repositories/review-repository";
import { ReviewVoteRepositoryHashMap } from "../repositories/review-vote-repository";
import { ReviewLogic } from "./logic";

export const buildReviewLogicTest = () => {
  const { mediaLogic } = buildMediaLogicTest();

  const userRepository = new UserRepositoryHashMap();
  const reviewRepository = new ReviewRepositoryHashMap({});
  const reviewVoteRepository = new ReviewVoteRepositoryHashMap({});

  const reviewLogic = new ReviewLogic({
    userRepository,
    mediaLogic,
    reviewRepository,
    reviewVoteRepository,
  });

  return { reviewLogic };
};
