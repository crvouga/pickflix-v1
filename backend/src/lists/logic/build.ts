import { MediaLogic } from "../../media/logic/build";
import { IUnitOfWork } from "../../common/unit-of-work/types";
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
import { addLists, editLists, getListAggergations, removeLists } from "./lists";

export class ListLogic {
  unitOfWork: IUnitOfWork;
  mediaLogic: MediaLogic;

  constructor({
    unitOfWork,
    mediaLogic,
  }: {
    unitOfWork: IUnitOfWork;
    mediaLogic: MediaLogic;
  }) {
    this.unitOfWork = unitOfWork;
    this.mediaLogic = mediaLogic;
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
  addLists = addLists;
  removeLists = removeLists;
  editLists = editLists;
}
