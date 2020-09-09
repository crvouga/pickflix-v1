import supertest from 'supertest';
import {build} from './build';

describe('GET /lists', () => {
  it('gets lists for current user', async done => {
    const {ListLogic, currentUser, app} = build();

    const lists = await Promise.all(
      [1, 2, 3, 4, 5].map(n =>
        ListLogic.createList({
          userIds: [currentUser.id],
          title: 'my movies 1',
          description: 'some cool movies...',
        })
      )
    );

    supertest(app)
      .get('/lists')
      .expect(200)
      .then(response => {
        expect(response.body.results).toStrictEqual(lists);
      });

    done();
  });
});
