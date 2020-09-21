import {IUnitOfWork} from '../../unit-of-work/types';
import {AddListItems} from './add-list-items/logic';
import {AddLists} from './add-lists/logic';
import {EditLists} from './edit-lists/logic';
import {GetListItems} from './get-list-items/logic';
import {GetLists} from './get-lists/logic';
import {RemoveListItems} from './remove-list-items/logic';
import {TMDbLogic} from '../../TMDb/logic/types';
import {RemoveLists} from './remove-lists';

export type Build<T> = (_: {
  TMDbLogic: TMDbLogic;
  unitOfWork: IUnitOfWork;
}) => T;

export interface ListLogic {
  addLists: AddLists;
  addListItems: AddListItems;
  editLists: EditLists;
  getListItems: GetListItems;
  getLists: GetLists;
  removeLists: RemoveLists;
  removeListItems: RemoveListItems;
}
