import {buildListLogicFake} from '../build.fake';
import {makeUserFake} from '../../../users/models/make-user.fake';

describe('getting list items', () => {
  it('get aggergated list items', async () => {
    const {listLogic} = buildListLogicFake();

    const user = makeUserFake();
    const [list] = await listLogic.addLists([
      {ownerId: user.id, title: 'my list'},
    ]);

    const listItems = await listLogic.addListItems(
      [1, 2, 3, 4, 5].map(n => ({
        userId: user.id,
        listId: list.id,
        tmdbMediaId: `${n}`,
        tmdbMediaType: 'movie',
      }))
    );

    const aggergatedListItems = await listLogic.getListItems({listId: list.id});

    expect(aggergatedListItems).toEqual(
      expect.arrayContaining(
        listItems.map(listItem =>
          expect.objectContaining({
            ...listItem,
            tmdbData: expect.any(Object),
          })
        )
      )
    );
  });
});
