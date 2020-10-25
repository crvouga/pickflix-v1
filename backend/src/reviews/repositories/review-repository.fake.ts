import {RepositoryInMemory} from '../../unit-of-work/repository.in-memory';
import {Review} from '../models/make-review';
import {IReviewRepository} from './types';

export class ReviewRepositoryInMemory
  extends RepositoryInMemory<Review>
  implements IReviewRepository {
  constructor() {
    super();
  }
}
