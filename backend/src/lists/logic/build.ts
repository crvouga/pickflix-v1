import {Id} from '../../id/types';
import {MediaLogic} from '../../media/logic/build';
import {IUnitOfWork} from '../../unit-of-work/types';
import {addInitialAutoLists} from './add-initial-auto-lists/logic';
import {addListItems} from './add-list-items/logic';
import {addLists} from './add-lists';
import {editLists} from './edit-lists/logic';
import {getListItems} from './get-list-items/logic';
import {getAutoLists, getLists, getListsAndAutoLists} from './get-lists/logic';
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

  addInitialAutoLists = addInitialAutoLists;
  getAutoLists = getAutoLists;
  addLists = addLists;
  getLists = getLists;
  addListItems = addListItems;
  getListItems = getListItems;
  removeLists = removeLists;
  editLists = editLists;
  getListsAndAutoLists = getListsAndAutoLists;

  async removeListItems(listItemInfos: {id: Id}[]) {
    await this.unitOfWork.ListItems.remove(listItemInfos);
  }
}
