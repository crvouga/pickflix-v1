import supertest from 'supertest';
import {build} from './build';

describe('DELETE /lists/:listId', () => {
  it('deletes list', async done => {
    const {app, ListLogic, currentUser} = build();

    const list = await ListLogic.createList({
      userIds: [currentUser.id],
      title: 'my movies',
      description: 'some cool movies',
    });

    supertest(app)
      .delete(`/lists/${list.id}`)
      .expect(200)
      .then(response => {
        done();
      });
  });
});
