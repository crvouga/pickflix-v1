import {buildListLogicFake} from '../build.fake';
import {makeUserFake} from '../../../users/models/make-user.fake';

describe('getting list items', () => {
  it('get aggergated list items', async () => {
    const {ListLogic} = buildListLogicFake();

    const user = makeUserFake();
    const [list] = await ListLogic.addLists([
      {ownerId: user.id, title: 'my list'},
    ]);

    const listItems = await ListLogic.addListItems(
      [1, 2, 3, 4, 5].map(n => ({
        listId: list.id,
        tmdbMediaId: `${n}`,
        tmdbMediaType: 'movie',
      }))
    );

    const aggergatedListItems = await ListLogic.getListItems({listId: list.id});

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
