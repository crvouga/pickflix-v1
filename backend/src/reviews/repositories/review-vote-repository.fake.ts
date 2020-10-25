import {RepositoryInMemory} from '../../unit-of-work/repository.in-memory';
import {ReviewVote} from '../models/make-review-vote';
import {IReviewVoteRepository} from './types';

export class ReviewVoteRepositoryInMemory
  extends RepositoryInMemory<ReviewVote>
  implements IReviewVoteRepository {
  constructor() {
    super();
  }
}
