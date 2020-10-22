import {makeReview, Review} from './make-review';
import {makeUserFake} from '../../users/models/make-user.fake';
import {TmdbMediaType} from '../../media/models/types';

export const makeReviewFake = (overrides?: Partial<Review>) => {
  return makeReview({
    authorId: makeUserFake().id,
    content: 'cool movie',
    tmdbMediaId: '550',
    tmdbMediaType: TmdbMediaType.movie,
    ...overrides,
  });
};
