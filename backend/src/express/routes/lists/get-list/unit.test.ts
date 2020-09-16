import supertest from 'supertest';
import {buildExpressAppFake} from '../../../express-app.fake';

describe('GET', () => {
  it('sends a list with items', async done => {
    const {ListLogic, currentUser, app} = await buildExpressAppFake();

    const list = await ListLogic.createList({
      userIds: [currentUser.id],
      title: 'my list',
      description: 'my description',
    });

    await ListLogic.addListItems(
      [1, 2, 3, 4, 5].map(n => ({
        listId: list.id,
        tmdbMediaType: 'movie',
        tmdbMediaId: `${n}`,
      }))
    );

    const expected = {
      id: list.id,
      userIds: list.userIds,
      title: list.title,
      description: list.description,
    };

    supertest(app)
      .get(`/api/lists/${list.id}`)
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(expect.objectContaining(expected));
        done();
      });
  });
});
