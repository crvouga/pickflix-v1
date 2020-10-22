import supertest from 'supertest';
import {buildExpressAppFake} from '../../../express/build.fake';

describe('getting items', () => {
  it('gets items', async done => {
    try {
      const {app, listLogic, currentUser} = await buildExpressAppFake();

      const [list] = await listLogic.addLists([
        {
          ownerId: currentUser.id,
          title: 'my list',
        },
      ]);

      const listItems = await listLogic.addListItems([
        {
          userId: currentUser.id,
          tmdbMediaId: '550',
          tmdbMediaType: 'movie',
          listId: list.id,
        },
      ]);

      await supertest(app)
        .get(`/api/lists/${list.id}/list-items`)
        .expect(200)
        .then(response => {
          expect(response.body).toEqual(
            expect.arrayContaining(
              listItems.map(listItem =>
                expect.objectContaining({
                  ...listItem,
                  tmdbData: expect.objectContaining({}),
                })
              )
            )
          );
        });
    } catch (error) {
      expect(false).toBe(true);
    } finally {
      done();
    }
  });
});
