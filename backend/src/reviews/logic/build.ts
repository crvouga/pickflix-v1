import { buildRepositoriesTest } from "../../app/build/build-test";
import { buildMediaLogicTest } from "../../media/logic/build";
import { ReviewLogic } from "./logic";

export const buildReviewLogicTest = async () => {
  const { mediaLogic } = buildMediaLogicTest();

  const { repositories } = await buildRepositoriesTest();

  const reviewLogic = new ReviewLogic({
    ...repositories,
    mediaLogic,
  });

  return { reviewLogic };
};
