import { buildRepositoriesTest } from "../../app/build/build-test";
import { emailLogicStub } from "../../app/email";
import { createEventEmitter, Events } from "../../app/events";
import { UserLogic } from "./logic";

export const buildUserLogicTest = async () => {
  const eventEmitter = createEventEmitter<Events>();
  const emailLogic = emailLogicStub;

  const { repositories } = await buildRepositoriesTest();

  const userLogic = new UserLogic({
    ...repositories,
    eventEmitter,
    emailLogic,
  });

  return { userLogic, eventEmitter };
};
