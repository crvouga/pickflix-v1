import {RepositoryFake} from '../../unit-of-work/repository.fake';
import {Like} from '../models/types';
import {ILikeRepository} from './types';

export class LikeRepositoryFake
  extends RepositoryFake<Like>
  implements ILikeRepository {
  constructor() {
    super();
  }
}
