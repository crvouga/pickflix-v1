import {RepositoryFake} from '../../unit-of-work/repository.fake';
import {ListItem} from '../models/types';
import {IListItemRepository} from './types';

export class ListItemRepositoryFake
  extends RepositoryFake<ListItem>
  implements IListItemRepository {
  constructor() {
    super();
  }
}
