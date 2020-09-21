import supertest from 'supertest';
import {makeExpressAppFake} from '../../../fake';

describe('/lists/{list-id}/list-items/{list-item-id}', () => {
  it('deletes list item', async done => {
    const {app, ListLogic, currentUser} = makeExpressAppFake();

    const [list] = await ListLogic.addLists([
      {
        ownerId: currentUser.id,
        title: 'my movies',
        description: 'some cool movies',
      },
    ]);

    const [listItem] = await ListLogic.addListItems([
      {
        listId: list.id,
        tmdbMediaId: '42',
        tmdbMediaType: 'movie',
      },
    ]);

    await supertest(app)
      .delete(`/api/lists/${list.id}/list-items`)
      .send([listItem.id])
      .expect(204);

    const listItems = await ListLogic.getListItems({listId: list.id});
    expect(listItems).not.toContainEqual(listItem);

    done();
  });
});
