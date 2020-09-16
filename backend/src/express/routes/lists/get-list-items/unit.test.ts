import supertest from 'supertest';
import {buildExpressAppFake} from '../../../express-app.fake';

describe('getting items', () => {
  it('gets items', async done => {
    const {app, ListLogic, currentUser} = await buildExpressAppFake();

    const list = await ListLogic.createList({
      userIds: [currentUser.id],
      title: 'my list',
    });

    const [listItem] = await ListLogic.addListItems([
      {
        tmdbMediaId: '550',
        tmdbMediaType: 'movie',
        listId: list.id,
      },
    ]);

    await supertest(app)
      .get(`/api/lists/${list.id}/list-items`)
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              ...listItem,
              tmdbData: expect.objectContaining({}),
            }),
          ])
        );
      });

    done();
  });
});
