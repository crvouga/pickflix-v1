import {RepositoryInMemory} from '../../unit-of-work/repository.in-memory';
import {AutoList} from '../models/types';
import {IAutoListRepository} from './types';

export class AutoListRepositoryInMemory
  extends RepositoryInMemory<AutoList>
  implements IAutoListRepository {
  constructor() {
    super();
  }
}
