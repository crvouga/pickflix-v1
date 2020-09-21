import supertest from 'supertest';
import {makeExpressAppFake} from '../../../fake';

describe('DELETE', () => {
  it('deletes list', async done => {
    const {app, ListLogic, currentUser} = makeExpressAppFake();
    const [list] = await ListLogic.addLists([
      {
        ownerId: currentUser.id,
        title: 'my movies',
      },
    ]);
    await supertest(app).delete(`/api/lists/${list.id}`).expect(204);
    const lists = await ListLogic.getLists({listId: list.id});
    expect(lists).toHaveLength(0);
    done();
  });
});
