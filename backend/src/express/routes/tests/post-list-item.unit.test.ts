import supertest from 'supertest';
import {makeList} from '../../../lists/models';
import {build} from './build';

describe('POST /lists/:listId/items', () => {
  it('adds item to list', async done => {
    const {currentUser, app} = build();

    const list = makeList({
      userIds: [currentUser.id],
      title: 'my list',
    });

    supertest(app)
      .post(`/lists/${list.id}/items`)
      .send({
        tmdbId: 42,
        tmdbMediaType: 'movie',
      })
      .expect(201)
      .then(response => {
        expect(response.body).toMatchObject({
          tmdbId: 42,
          tmdbMediaType: 'movie',
        });
        done();
      });
  });
});
