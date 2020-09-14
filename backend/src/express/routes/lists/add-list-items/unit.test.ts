import supertest from 'supertest';
import {makeList} from '../../../../lists/models';
import {buildExpressAppFake} from '../../../express-app.fake';

describe('add-lists-items', () => {
  it('adds item to list', async done => {
    const {currentUser, app} = await buildExpressAppFake();

    const list = makeList({
      userIds: [currentUser.id],
      title: 'my list',
    });

    supertest(app)
      .post(`/api/lists/${list.id}/list-items`)
      .send({
        tmdbId: 42,
        tmdbMediaType: 'movie',
      })
      .expect(201)
      .then(response => {
        expect(typeof response.body.message).toBe('string');
        done();
      });
  });
});
