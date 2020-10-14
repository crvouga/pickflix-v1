import {ListItemRepositoryFake} from './list-item-repository.fake';
import {ListRepositoryFake} from './list-repository.fake';
import {AutoListRepositoryFake} from './auto-list-repository.fake';

export const ListRepository = new ListRepositoryFake();
export const ListItemRepository = new ListItemRepositoryFake();
export const AutoListRepository = new AutoListRepositoryFake();
