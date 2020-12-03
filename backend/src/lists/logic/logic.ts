import { Emitter, Events } from "../../app/events";
import { MediaLogic } from "../../media/logic/logic";
import { IUserRepository } from "../../users/repositories/user-repository";
import { IAutoListRepository } from "../repositories/auto-list-repository";
import { IListItemRepository } from "../repositories/list-item-repository";
import { IListRepository } from "../repositories/list-repository";
import { IPermissionRepository } from "../repositories/permission-repository";
import {
  aggergateAutoList,
  getAutoList,
  getAutoListAggergations,
  initializeAutoLists,
} from "./auto-lists";
import {
  addListItems,
  aggergateListItem,
  getListItemAggergations,
  removeListItems,
  setListItems,
  toggleListItem,
} from "./list-items";
import {
  addList,
  aggergateList,
  editList,
  getListAggergations,
  getListAggergationsFromId,
  getListAggergationsFromUserId,
  removeList,
  getListsFromMediaIdAndUserId,
  getListsFromUserId,
} from "./lists";

export class ListLogic {
  userRepository: IUserRepository;
  listRepository: IListRepository;
  listItemRepository: IListItemRepository;
  autoListRepository: IAutoListRepository;
  permissionRepository: IPermissionRepository;
  mediaLogic: MediaLogic;
  eventEmitter: Emitter<Events>;

  constructor({
    mediaLogic,
    userRepository,
    listRepository,
    listItemRepository,
    autoListRepository,
    permissionRepository,
    eventEmitter,
  }: {
    eventEmitter: Emitter<Events>;
    mediaLogic: MediaLogic;
    listRepository: IListRepository;
    listItemRepository: IListItemRepository;
    autoListRepository: IAutoListRepository;
    userRepository: IUserRepository;
    permissionRepository: IPermissionRepository;
  }) {
    this.permissionRepository = permissionRepository;
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
  aggergateAutoList = aggergateAutoList;
  aggergateListItem = aggergateListItem;

  initializeAutoLists = initializeAutoLists;
  getAutoListAggergations = getAutoListAggergations;
  getAutoList = getAutoList;

  getListAggergationsFromUserId = getListAggergationsFromUserId;
  getListAggergationsFromId = getListAggergationsFromId;
  getListItemAggergations = getListItemAggergations;
  addListItems = addListItems;
  removeListItems = removeListItems;
  toggleListItem = toggleListItem;
  setListItems = setListItems;

  getListAggergations = getListAggergations;
  addList = addList;
  removeList = removeList;
  editList = editList;
  getListsFromMediaIdAndUserId = getListsFromMediaIdAndUserId;
  getListsFromUserId = getListsFromUserId;
}
