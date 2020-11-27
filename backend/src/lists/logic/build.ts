import { createEventEmitter, Events } from "../../app/events";
import { buildMediaLogicTest } from "../../media/logic/build";
import { UserRepositoryHashMap } from "../../users/repositories/user-repository";
import { AutoListRepositoryHashMap } from "../repositories/auto-list-repository";
import { ListItemRepositoryHashMap } from "../repositories/list-item-repository";
import { ListRepositoryHashMap } from "../repositories/list-repository";
import { ListLogic } from "./logic";

export const buildListLogicTest = () => {
  const { mediaLogic } = buildMediaLogicTest();
  const eventEmitter = createEventEmitter<Events>();
  const userRepository = new UserRepositoryHashMap();
  const listRepository = new ListRepositoryHashMap();
  const listItemRepository = new ListItemRepositoryHashMap();
  const autoListRepository = new AutoListRepositoryHashMap();

  const listLogic = new ListLogic({
    eventEmitter,
    mediaLogic,
    userRepository,
    listRepository,
    listItemRepository,
    autoListRepository,
  });

  return { listLogic };
};
