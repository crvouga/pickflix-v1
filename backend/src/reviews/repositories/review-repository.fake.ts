import {RepositoryFake} from '../../unit-of-work/repository.fake';
import {Review} from '../models/make-review';
import {IReviewRepository} from './types';

export class ReviewRepositoryFake
  extends RepositoryFake<Review>
  implements IReviewRepository {
  constructor() {
    super();
  }
}
