import supertest from 'supertest';
import {makeExpressAppFake} from '../../../express/fake';

describe('PATCH', () => {
  it('sends back edited list', async done => {
    const {currentUser, listLogic, app} = makeExpressAppFake();
    const [created] = await listLogic.addLists([
      {
        ownerId: currentUser.id,
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
