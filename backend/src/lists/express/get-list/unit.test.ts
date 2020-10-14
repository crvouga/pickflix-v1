import supertest from 'supertest';
import {buildExpressAppFake} from '../../../express/build.fake';

describe('GET', () => {
  it('gets auto lists', async done => {
    const {listLogic, currentUser, app} = await buildExpressAppFake();
    const [added] = await listLogic.addInitialAutoLists({user: currentUser});

    const expected = {
      id: added.id,
      ownerId: added.ownerId,
      title: added.title,
    };

    supertest(app)
      .get(`/api/lists/${added.id}`)
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(expect.objectContaining(expected));
        done();
      });
  });
  it('sends a list with items', async done => {
    const {listLogic, currentUser, app} = await buildExpressAppFake();

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
