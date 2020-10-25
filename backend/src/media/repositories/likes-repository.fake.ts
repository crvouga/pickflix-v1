import {RepositoryInMemory} from '../../unit-of-work/repository.in-memory';
import {Entity} from '../models/types';
import {ILikesRepository} from './types';

export class LikesRepositoryInMemory
  extends RepositoryInMemory<Entity>
  implements ILikesRepository {
  constructor() {
    super();
  }
}
