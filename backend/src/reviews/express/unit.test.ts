import supertest from 'supertest';
import {buildExpressAppFake} from '../../express/build.fake';
import {makeUserFake} from '../../users/models/make-user.fake';

describe('/reviews endpoint', () => {
  it('gets reviews', async () => {
    const {app, reviewLogic} = await buildExpressAppFake();

    const user = makeUserFake();

    await reviewLogic.addReview({
      authorId: user.id,
      tmdbMediaId: '550',
      tmdbMediaType: 'movie',
      content: 'cool',
    });

    await supertest(app)
      .get('/api/reviews')
      .query({
        tmdbMediaId: '550',
        tmdbMediaType: 'movie',
      })
      .expect(200);
  });
});
