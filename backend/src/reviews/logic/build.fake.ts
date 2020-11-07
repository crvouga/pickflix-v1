import { UnitOfWorkInMemory } from "../../unit-of-work/unit-of-work.fake";
import { ReviewLogic } from "./build";
import { buildMediaLogicFake } from "../../media/logic/build.fake";

export const buildReviewLogicFake = () => {
  const { mediaLogic } = buildMediaLogicFake();

  const reviewLogic = new ReviewLogic({
    unitOfWork: new UnitOfWorkInMemory(),
    mediaLogic,
  });

  return { reviewLogic };
};
