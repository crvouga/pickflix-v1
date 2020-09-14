import supertest from 'supertest';
import {buildExpressAppFake} from '../../../express-app.fake';

describe('/lists', () => {
  describe('GET', () => {
    it('gets lists for current user', async done => {
      const {ListLogic, currentUser, app} = await buildExpressAppFake();

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
        .get('/api/lists')
        .expect(200)
        .then(response => {
          expect(response.body).toStrictEqual(lists);
          done();
        });
    });
  });

  describe('GET ?tmdbMediaIds[]=', () => {
    it('associated tmdbMediaId', async done => {
      const {ListLogic, currentUser, app} = await buildExpressAppFake();
      const before1 = await ListLogic.createList({
        userIds: [currentUser.id],
        title: '1',
      });
      const before2 = await ListLogic.createList({
        userIds: [currentUser.id],
        title: '2',
      });
      const tmdbMediaId = '42';
      await ListLogic.addListItems([
        {
          tmdbMediaId,
          tmdbMediaType: 'movie',
          listId: before1.id,
        },
      ]);

      await supertest(app)
        .get(`/api/lists?tmdbMediaIds[]=${tmdbMediaId}`)
        .expect(200)
        .then(response => {
          const lists = response.body as any[];
          const after1 = lists.filter(_ => _.id === before1.id)[0];
          const after2 = lists.filter(_ => _.id === before2.id)[0];

          expect(after1.tmdbMediaIds).toStrictEqual([tmdbMediaId]);
          expect(after2.tmdbMediaIds).toBeFalsy();
        });
      done();
    });
  });
});
