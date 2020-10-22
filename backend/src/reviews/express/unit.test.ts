import supertest from 'supertest';
import {buildExpressAppFake} from '../../express/build.fake';
import {makeUserFake} from '../../users/models/make-user.fake';
import {makeReviewFake} from '../models/make-review.fake';
import {TmdbMediaType} from '../../media/models/types';

describe('/api/reviews', () => {
  it('GET /reviews?tmdbMediaId=...&tmdbMediaType=...', async () => {
    const {app, reviewLogic, currentUser} = await buildExpressAppFake();

    for (const i of [1, 2, 3]) {
      await reviewLogic.addReview(
        makeReviewFake({
          authorId: makeUserFake().id,
        })
      );
    }

    const expected = await reviewLogic.getAllReviewsForMedia({
      userId: currentUser.id,
      tmdbMediaId: '550',
      tmdbMediaType: TmdbMediaType.movie,
    });

    const response = await supertest(app)
      .get('/api/reviews')
      .query({
        tmdbMediaId: '550',
        tmdbMediaType: TmdbMediaType.movie,
      })
      .expect(200);

    expect(response.body).toStrictEqual(expected);
  });

  it('POST /reviews', async () => {
    const {app, reviewLogic, currentUser} = await buildExpressAppFake();

    const response = await supertest(app)
      .post('/api/reviews')
      .send({
        content: 'cool movie',
        tmdbMediaId: '550',
        tmdbMediaType: 'movie',
      })
      .expect(201);

    const created = response.body;

    expect(created).toEqual(
      expect.objectContaining({
        content: 'cool movie',
        tmdbMediaId: '550',
        tmdbMediaType: 'movie',
      })
    );
  });
});
