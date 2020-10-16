import supertest from 'supertest';
import {buildExpressAppFake} from '../../../express/build.fake';
import {TmdbMediaType} from '../../../media/models/types';

describe('GET /list-items/lists', () => {
  it('gets list from list item media', async done => {
    const {app, listLogic, currentUser} = await buildExpressAppFake();

    const listInfo = {title: 'hello', ownerId: currentUser.id};

    const [list1, list2, list3] = await listLogic.addLists([
      listInfo,
      listInfo,
      listInfo,
    ]);

    const listItemMediaInfo = {
      tmdbMediaId: '550',
      tmdbMediaType: 'movie' as TmdbMediaType,
    };

    const listItemInfo = {
      ...listItemMediaInfo,
      userId: currentUser.id,
    };

    await listLogic.addListItems([
      {...listItemInfo, listId: list1.id},
      {...listItemInfo, listId: list2.id},
    ]);

    const response = await supertest(app)
      .get('/api/list-items/lists')
      .send(listItemMediaInfo)
      .expect(200);

    expect(response.body).toContainEqual(list1);
    expect(response.body).toContainEqual(list2);
    expect(response.body).not.toContainEqual(list3);

    done();
  });
});
