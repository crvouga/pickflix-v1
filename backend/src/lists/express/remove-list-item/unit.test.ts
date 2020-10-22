import supertest from 'supertest';
import {buildExpressAppFake} from '../../../express/build.fake';
import {TmdbMediaType} from '../../../media/models/types';

describe('/lists/{list-id}/list-items/{list-item-id}', () => {
  it('deletes list item', async done => {
    const {app, listLogic, currentUser} = await buildExpressAppFake();

    const [list] = await listLogic.addLists([
      {
        ownerId: currentUser.id,
        title: 'my movies',
        description: 'some cool movies',
      },
    ]);

    const [listItem] = await listLogic.addListItems([
      {
        userId: currentUser.id,
        listId: list.id,
        tmdbMediaId: 42,
        tmdbMediaType: TmdbMediaType.movie,
      },
    ]);

    await supertest(app)
      .delete(`/api/lists/${list.id}/list-items`)
      .send([listItem.id])
      .expect(204);

    const listItems = await listLogic.getListItems({listId: list.id});
    expect(listItems).not.toContainEqual(listItem);

    done();
  });
});
