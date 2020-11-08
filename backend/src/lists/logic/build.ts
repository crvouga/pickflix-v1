import { MediaLogic } from "../../media/logic/build";
import { IUnitOfWork } from "../../unit-of-work/types";

import { aggergateList, aggergateListItem } from "./aggergate";

import {
  getListItemAggergations,
  addListItems,
  removeListItems,
} from "./list-items";
import {
  initializeAutoLists,
  getAutoListAggergations,
} from "./auto-lists/logic";

import { removeLists, addLists, editLists, getListAggergations } from "./lists";

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

  getListItemAggergations = getListItemAggergations;
  addListItems = addListItems;
  removeListItems = removeListItems;

  getListAggergations = getListAggergations;
  addLists = addLists;
  removeLists = removeLists;
  editLists = editLists;
}
