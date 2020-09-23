import supertest from 'supertest';
import {makeExpressAppFake} from '../../../express/fake';

describe('add-lists-items', () => {
  it('adds item to list', async done => {
    const {currentUser, app} = makeExpressAppFake();

    const agent = supertest(app);
    const {body: list} = await agent.post('/api/lists').send({
      ownerId: currentUser.id,
      title: 'my list',
    });

    const listItemInfo = {
      tmdbMediaId: 42,
      tmdbMediaType: 'movie',
    };
    await agent
      .post(`/api/lists/${list.id}/list-items`)
      .send(listItemInfo)
      .expect(201)
      .then(response => {
        expect(response.body).toEqual(expect.objectContaining(listItemInfo));
      });
    done();
  });
});
