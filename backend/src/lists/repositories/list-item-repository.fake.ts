import {RepositoryInMemory} from '../../unit-of-work/repository.in-memory';
import {ListItem} from '../models/types';
import {IListItemRepository} from './types';

export class ListItemRepositoryInMemory
  extends RepositoryInMemory<ListItem>
  implements IListItemRepository {
  constructor() {
    super();
  }
}
