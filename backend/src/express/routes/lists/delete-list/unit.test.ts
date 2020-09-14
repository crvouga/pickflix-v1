import supertest from 'supertest';
import {buildExpressAppFake} from '../../../express-app.fake';

describe('DELETE', () => {
  it('deletes list', async done => {
    const {app, ListLogic, currentUser} = await buildExpressAppFake();

    const list = await ListLogic.createList({
      userIds: [currentUser.id],
      title: 'my movies',
      description: 'some cool movies',
    });

    await supertest(app).delete(`/api/lists/${list.id}`).expect(204);
    done();
  });
});
