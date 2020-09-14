import supertest from 'supertest';
import {buildExpressAppFake} from '../../../express-app.fake';

describe('PATCH', () => {
  it('sends back edited list', async done => {
    const {currentUser, ListLogic, app} = await buildExpressAppFake();
    const created = await ListLogic.createList({
      userIds: [currentUser.id],
      title: 'my movies',
    });

    const edits = {
      title: 'My Movies!!!',
    };

    await supertest(app)
      .patch(`/api/lists/${created.id}`)
      .send(edits)
      .expect(200)
      .then(response => {
        expect(response.body).toStrictEqual({
          ...created,
          ...edits,
        });
      });
    done();
  });
});
