import {buildExpressAppFake} from '../../../express/build.fake';
import supertest from 'supertest';
import {AutoListTitleEnum} from '../../models/types';

describe('GET /auto-lists/watch-next', () => {
  it('gets watch next list', async done => {
    const {currentUser, listLogic, app} = await buildExpressAppFake();

    await listLogic.addInitialAutoLists({user: currentUser});

    const [list] = await listLogic.getAutoLists({
      ownerId: currentUser.id,
      title: AutoListTitleEnum.WatchNext,
    });

    supertest(app)
      .get('/api/auto-lists/watch-next')
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(expect.objectContaining(list));
        done();
      });
  });
});

describe('POST /auto-lists/watch-next/list-items', () => {
  it('adds item to watch next list', async done => {
    const {currentUser, listLogic, app} = await buildExpressAppFake();

    await listLogic.addInitialAutoLists({user: currentUser});

    const listItemInfo = {
      tmdbMediaId: 42,
      tmdbMediaType: 'movie',
    };

    await supertest(app)
      .post(`/api/auto-lists/watch-next/list-items`)
      .send(listItemInfo)
      .expect(201)
      .then(response => {
        expect(response.body).toEqual(expect.objectContaining(listItemInfo));
      });
    done();
  });
});
