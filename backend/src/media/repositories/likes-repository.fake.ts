import {RepositoryFake} from '../../unit-of-work/repository.fake';
import {Entity} from '../models/types';
import {ILikesRepository} from './types';

export class LikesRepositoryFake
  extends RepositoryFake<Entity>
  implements ILikesRepository {
  constructor() {
    super();
  }
}
