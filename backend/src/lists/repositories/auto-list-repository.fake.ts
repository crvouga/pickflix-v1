import {RepositoryFake} from '../../unit-of-work/repository.fake';
import {AutoList} from '../models/types';
import {IAutoListRepository} from './types';

export class AutoListRepositoryFake
  extends RepositoryFake<AutoList>
  implements IAutoListRepository {
  constructor() {
    super();
  }
}
