import {EventEmitter} from 'events';
import {EventTypes} from '../../events/events-types';
import {TmdbLogic} from '../../tmdb/logic/build';
import {IUnitOfWork} from '../../unit-of-work/types';
import {User} from '../../users/models/types';
import {makeList} from '../models';
import {List, ListItem} from '../models/types';
import {addListItems} from './add-list-items/logic';
import {editLists} from './edit-lists/logic';
import {getListItems} from './get-list-items/logic';
import {getLists} from './get-lists/logic';
import {removeLists} from './remove-lists';

export class ListLogic {
  static AUTO_LIST_TITLES = ['Watch Next', 'Liked', 'Favorites'];

  unitOfWork: IUnitOfWork;
  tmdbLogic: TmdbLogic;

  constructor({
    unitOfWork,
    tmdbLogic,
  }: {
    unitOfWork: IUnitOfWork;
    tmdbLogic: TmdbLogic;
  }) {
    this.unitOfWork = unitOfWork;
    this.tmdbLogic = tmdbLogic;
  }

  getLists = getLists;
  addListItems = addListItems;
  getListItems = getListItems;
  removeLists = removeLists;
  editLists = editLists;

  async removeListItems(listItemInfos: Pick<ListItem, 'id'>[]) {
    await this.unitOfWork.ListItems.remove(listItemInfos);
  }

  async addLists(listInfos: Partial<List>[]) {
    const lists = listInfos.map(makeList);
    const addedLists = await this.unitOfWork.Lists.add(lists);
    return addedLists;
  }

  async addAutoLists(user: User) {
    const listInfos: Partial<List>[] = ListLogic.AUTO_LIST_TITLES.map(
      title => ({
        title,
        ownerId: user.id,
        isAutoCreated: true,
        visibility: 'private',
      })
    );
    return await this.addLists(listInfos);
  }
}
