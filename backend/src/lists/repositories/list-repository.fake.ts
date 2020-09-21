import {List} from '../models/types';
import {RepositoryFake} from '../../unit-of-work/repository.fake';
import {IListRepository} from './types';

export class ListRepositoryFake
  extends RepositoryFake<List>
  implements IListRepository {
  constructor() {
    super();
  }
}
