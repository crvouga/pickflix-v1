import {TmdbMediaType} from '../../media/models/types';
import {makeUserFake} from '../../users/models/make-user.fake';
import {makeReview, Review} from './make-review';

export const makeReviewFake = (overrides?: Partial<Review>) => {
  return makeReview({
    authorId: makeUserFake().id,
    content: 'cool movie',
    tmdbMediaId: 550,
    tmdbMediaType: TmdbMediaType.movie,
    ...overrides,
  });
};
