import supertest from 'supertest';
import {buildExpressAppFake} from '../../../express/build.fake';

describe('GET /lists', () => {
  it('gets lists for current user', async done => {
    const {listLogic, user, app} = await buildExpressAppFake();

    const lists = await listLogic.addLists(
      [1, 2, 3, 4, 5].map(n => ({
        ownerId: user.id,
        title: 'my movies 1',
        description: 'some cool movies...',
      }))
    );

    supertest(app)
      .get('/api/lists')
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(
          expect.arrayContaining(lists.map(_ => expect.objectContaining(_)))
        );
        done();
      });
  });
});
