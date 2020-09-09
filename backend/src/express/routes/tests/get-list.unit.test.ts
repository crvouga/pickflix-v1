import supertest from 'supertest';
import {build} from './build';

describe('GET /lists/:listId', () => {
  it('sends a list with items', async done => {
    const {ListLogic, currentUser, app} = build();

    const list = await ListLogic.createList({
      userIds: [currentUser.id],
      title: 'my list',
      description: 'my description',
    });

    const listItems = await Promise.all(
      [1, 2, 3, 4, 5].map(n =>
        ListLogic.addItem({
          listId: list.id,
          tmdbMediaType: 'movie',
          tmdbId: `${n}`,
        })
      )
    );

    const expected = {
      id: list.id,
      userIds: list.userIds,
      title: list.title,
      description: list.description,
      items: {
        results: listItems,
      },
    };

    supertest(app)
      .get(`/lists/${list.id}`)
      .expect(200)
      .then(response => {
        expect(response.body).toMatchObject(expected);
        done();
      });
  });
});
