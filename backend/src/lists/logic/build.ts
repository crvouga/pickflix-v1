import {MediaLogic} from '../../media/logic/build';
import {IUnitOfWork} from '../../unit-of-work/types';
import {ListItem, List} from '../models/types';
import {addListItems} from './add-list-items/logic';
import {addLists} from './add-lists';
import {editLists} from './edit-lists/logic';
import {getListItems} from './get-list-items/logic';
import {getLists} from './get-lists/logic';
import {removeLists} from './remove-lists';
import {addAutoLists} from './add-auto-lists';

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

  addAutoLists = addAutoLists;
  addLists = addLists;
  getLists = getLists;
  addListItems = addListItems;
  getListItems = getListItems;
  removeLists = removeLists;
  editLists = editLists;

  async removeListItems(listItemInfos: Pick<ListItem, 'id'>[]) {
    await this.unitOfWork.ListItems.remove(listItemInfos);
  }
}
