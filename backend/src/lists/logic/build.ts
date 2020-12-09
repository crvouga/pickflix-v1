import { buildRepositoriesDependingOnTestEnvironment } from "../../app/build/build-repositories";
import { createEventEmitter, Events } from "../../app/events";
import { buildMediaLogicTest } from "../../media/logic/build";
import { ListLogic } from "./logic";

export const buildListLogicTest = async () => {
  const { mediaLogic } = buildMediaLogicTest();
  const eventEmitter = createEventEmitter<Events>();

  const { repositories } = await buildRepositoriesDependingOnTestEnvironment();

  const listLogic = new ListLogic({
    eventEmitter,
    mediaLogic,
    ...repositories,
  });

  return { listLogic };
};
