import {RepositoryFake} from '../../unit-of-work/repository.fake';
import {ReviewVote} from '../models/make-review-vote';
import {IReviewVoteRepository} from './types';

export class ReviewVoteRepositoryFake
  extends RepositoryFake<ReviewVote>
  implements IReviewVoteRepository {
  constructor() {
    super();
  }
}
