import { MediaLogic } from "../../media/logic/logic";
import { IUserRepository } from "../../users/repositories/user-repository";
import { IAutoListRepository } from "../repositories/auto-list-repository";
import { IListItemRepository } from "../repositories/list-item-repository";
import { IListRepository } from "../repositories/list-repository";
import { aggergateList, aggergateListItem } from "./aggergate";
import {
  getAutoList,
  getAutoListAggergations,
  getAutoListAggergationsByKey,
  initializeAutoLists,
} from "./auto-lists/logic";
import {
  addListItems,
  getListItem,
  getListItemAggergations,
  removeListItems,
} from "./list-items";
import { addList, editList, getListAggergations, removeList } from "./lists";
import { Emitter, Events } from "../../app/events";

export class ListLogic {
  userRepository: IUserRepository;
  listRepository: IListRepository;
  listItemRepository: IListItemRepository;
  autoListRepository: IAutoListRepository;
  mediaLogic: MediaLogic;
  eventEmitter: Emitter<Events>;

  constructor({
    mediaLogic,
    userRepository,
    listRepository,
    listItemRepository,
    autoListRepository,
    eventEmitter,
  }: {
    eventEmitter: Emitter<Events>;
    mediaLogic: MediaLogic;
    listRepository: IListRepository;
    listItemRepository: IListItemRepository;
    autoListRepository: IAutoListRepository;
    userRepository: IUserRepository;
  }) {
    this.userRepository = userRepository;
    this.mediaLogic = mediaLogic;
    this.listRepository = listRepository;
    this.listItemRepository = listItemRepository;
    this.autoListRepository = autoListRepository;
    this.eventEmitter = eventEmitter;

    this.eventEmitter.on("UserCreated", async (newUser) => {
      await this.initializeAutoLists({ user: newUser });
    });
  }

  aggergateList = aggergateList;
  aggergateListItem = aggergateListItem;

  initializeAutoLists = initializeAutoLists;
  getAutoListAggergations = getAutoListAggergations;
  getAutoListAggergationsByKey = getAutoListAggergationsByKey;
  getAutoList = getAutoList;

  getListItemAggergations = getListItemAggergations;
  addListItems = addListItems;
  removeListItems = removeListItems;
  getListItem = getListItem;

  getListAggergations = getListAggergations;
  addList = addList;
  removeList = removeList;
  editList = editList;
}
