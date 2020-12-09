import { buildRepositoriesDependingOnTestEnvironment } from "../../app/build/build-repositories";
import { buildMediaLogicTest } from "../../media/logic/build";
import { ReviewLogic } from "./logic";

export const buildReviewLogicTest = async () => {
  const { mediaLogic } = buildMediaLogicTest();

  const { repositories } = await buildRepositoriesDependingOnTestEnvironment();

  const reviewLogic = new ReviewLogic({
    ...repositories,
    mediaLogic,
  });

  return { reviewLogic };
};
