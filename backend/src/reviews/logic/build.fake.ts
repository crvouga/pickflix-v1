import { UnitOfWorkHashMap } from "../../unit-of-work/unit-of-work.fake";
import { ReviewLogic } from "./build";
import { buildMediaLogicFake } from "../../media/logic/build.fake";

export const buildReviewLogicFake = () => {
  const { mediaLogic } = buildMediaLogicFake();

  const reviewLogic = new ReviewLogic({
    unitOfWork: new UnitOfWorkHashMap(),
    mediaLogic,
  });

  return { reviewLogic };
};
