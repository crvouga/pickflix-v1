import supertest from 'supertest';
import {buildExpressAppFake} from '../../../express/build.fake';

describe('PATCH', () => {
  it('sends back error list', async done => {
    const {user, listLogic, app} = await buildExpressAppFake();
    const [created] = await listLogic.addLists([
      {
        ownerId: user.id,
        title: 'my movies',
      },
    ]);

    const edits = {
      title: '',
    };

    await supertest(app)
      .patch(`/api/lists/${created.id}`)
      .send(edits)
      .expect(400)
      .then(response => {
        expect(response.body).toHaveProperty('errors');
      });
    done();
  });
  it('sends back edited list', async done => {
    const {user, listLogic, app} = await buildExpressAppFake();
    const [created] = await listLogic.addLists([
      {
        ownerId: user.id,
        title: 'my movies',
      },
    ]);

    const edits = {
      title: 'My Movies!!!',
    };

    await supertest(app)
      .patch(`/api/lists/${created.id}`)
      .send(edits)
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(
          expect.objectContaining({
            ...created,
            ...edits,
          })
        );
      });
    done();
  });
});
