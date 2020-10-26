import {ListItemRepositoryInMemory} from './list-item-repository.fake';
import {ListRepositoryInMemory} from './list-repository.fake';
import {AutoListRepositoryInMemory} from './auto-list-repository.fake';

export const ListRepository = new ListRepositoryInMemory();
export const ListItemRepository = new ListItemRepositoryInMemory();
export const AutoListRepository = new AutoListRepositoryInMemory();
