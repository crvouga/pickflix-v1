import { UnitOfWorkHashMap } from "../../common/unit-of-work/unit-of-work.fake";
import { buildMediaLogicFake } from "../../media/logic/build.fake";
import {
  ReviewRepositoryFileSystem,
  ReviewRepositoryHashMap,
} from "../repositories/review-repository";
import {
  ReviewVoteRepositoryFileSystem,
  ReviewVoteRepositoryHashMap,
} from "../repositories/review-vote-repository";
import { ReviewLogic } from "./logic";
import {
  UserRepositoryHashMap,
  UserRepositoryFileSystem,
} from "../../users/repositories/user-repository";
import { MediaLogic } from "../../media/logic/build";

export const buildReviewLogicTest = () => {
  const { mediaLogic } = buildMediaLogicFake();

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

export const buildReviewLogicDevelopment = ({
  mediaLogic,
}: {
  mediaLogic: MediaLogic;
}) => {
  const userRepository = new UserRepositoryFileSystem();
  const reviewRepository = new ReviewRepositoryFileSystem();
  const reviewVoteRepository = new ReviewVoteRepositoryFileSystem();

  const reviewLogic = new ReviewLogic({
    mediaLogic,
    reviewRepository,
    reviewVoteRepository,
    userRepository,
  });

  return reviewLogic;
};

export const buildReviewLogicProduction = ({
  mediaLogic,
}: {
  mediaLogic: MediaLogic;
}) => {
  return buildReviewLogicDevelopment({ mediaLogic });
};
