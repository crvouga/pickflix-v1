import {buildExpressAppFake} from '../../../express/build.fake';
import supertest from 'supertest';
import {AutoListKeys} from '../../models/types';

describe('GET /auto-lists/watch-next', () => {
  it('fails if invalid auto list keys', async done => {
    const {currentUser, listLogic, app} = await buildExpressAppFake();

    await listLogic.initializeAutoLists({user: currentUser});

    await supertest(app).get('/api/auto-lists/watchNext').expect(400);
    await supertest(app).get('/api/auto-lists/Liked').expect(400);
    await supertest(app)
      .get('/api/auto-lists/watch-next')
      .then(res => expect(res.status).not.toEqual(400));
    await supertest(app)
      .get('/api/auto-lists/liked')
      .then(res => expect(res.status).not.toEqual(400));
    done();
  });

  it('gets watch next list', async done => {
    const {currentUser, listLogic, app} = await buildExpressAppFake();

    await listLogic.initializeAutoLists({user: currentUser});

    const [list] = await listLogic.getAutoLists({
      ownerId: currentUser.id,
      key: AutoListKeys.WatchNext,
    });

    await supertest(app)
      .get(`/api/auto-lists/${AutoListKeys.WatchNext}`)
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(expect.objectContaining(list));
      });
    done();
  });

  it('gets liked list', async done => {
    const {currentUser, listLogic, app} = await buildExpressAppFake();

    await listLogic.initializeAutoLists({user: currentUser});

    const [list] = await listLogic.getAutoLists({
      ownerId: currentUser.id,
      key: AutoListKeys.Liked,
    });

    await supertest(app)
      .get(`/api/auto-lists/${AutoListKeys.Liked}`)
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(expect.objectContaining(list));
      });
    done();
  });
});

describe('POST /auto-lists/watch-next/list-items', () => {
  it('adds item to watch next list', async done => {
    const {currentUser, listLogic, app} = await buildExpressAppFake();

    await listLogic.initializeAutoLists({user: currentUser});

    const listItemInfo = {
      tmdbMediaId: 42,
      tmdbMediaType: 'movie',
    };

    await supertest(app)
      .post(`/api/auto-lists/${AutoListKeys.WatchNext}/list-items`)
      .send(listItemInfo)
      .expect(201);

    done();
  });
});
