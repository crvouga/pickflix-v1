import {MediaLogic} from '../../media/logic/build';
import {IUnitOfWork} from '../../unit-of-work/types';
import {ListItemId} from '../models/types';
import {addListItems} from './add-list-items/logic';
import {addLists} from './add-lists';
import {aggergateList, aggergateListItem} from './aggergate';
import {editLists} from './edit-lists/logic';
import {getListItems} from './get-list-items/logic';
import {
  getAutoLists,
  getLists,
  getListsAndAutoLists,
  getListsFromListItem,
} from './get-lists';
import {initializeAutoLists} from './initialize-auto-lists/logic';
import {removeLists} from './remove-lists';

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
  getAutoLists = getAutoLists;
  addLists = addLists;
  getLists = getLists;
  addListItems = addListItems;
  getListItems = getListItems;
  removeLists = removeLists;
  editLists = editLists;
  getListsAndAutoLists = getListsAndAutoLists;
  getListsFromListItem = getListsFromListItem;

  async removeListItems(listItemInfos: {id: ListItemId}[]) {
    await this.unitOfWork.ListItems.remove(listItemInfos);
  }
}
