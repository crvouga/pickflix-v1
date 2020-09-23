import supertest from 'supertest';
import {makeExpressAppFake} from '../../../express/fake';

describe('GET', () => {
  it('sends a list with items', async done => {
    const {listLogic, currentUser, app} = makeExpressAppFake();

    const [list] = await listLogic.addLists([
      {
        ownerId: currentUser.id,
        title: 'my list',
        description: 'my description',
      },
    ]);

    const expected = {
      id: list.id,
      ownerId: list.ownerId,
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
