import {RepositoryInMemory} from '../../unit-of-work/repository.in-memory';
import {Like} from '../models/types';
import {ILikeRepository} from './types';

export class LikeRepositoryInMemory
  extends RepositoryInMemory<Like>
  implements ILikeRepository {
  constructor() {
    super();
  }
}
