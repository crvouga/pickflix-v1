import {buildListLogicFake} from '../build.fake';
import {makeUserFake} from '../../../users/models/make-user.fake';
import {TmdbMediaType} from '../../../media/models/types';

describe('getting lists', () => {
  it('gets aggergated lists by ownerId or listId', async () => {
    const {listLogic} = buildListLogicFake();
    const user = makeUserFake();
    const [list] = await listLogic.addLists([
      {
        ownerId: user.id,
        title: 'my list',
      },
    ]);
    const [listItem] = await listLogic.addListItems([
      {
        userId: user.id,
        listId: list.id,
        tmdbMediaId: '550',
        tmdbMediaType: 'movie',
      },
    ]);

    const [aggergatedList1] = await listLogic.getLists({id: list.id});
    const [aggergatedList2] = await listLogic.getLists({
      ownerId: user.id,
    });

    expect(aggergatedList1).toStrictEqual(aggergatedList2);

    expect(aggergatedList1).toEqual(
      expect.objectContaining({
        ...list,
        listItemCount: expect.any(Number),
        listItems: expect.arrayContaining([
          expect.objectContaining({
            ...listItem,
            tmdbData: expect.any(Object),
          }),
        ]),
      })
    );
  });
});

describe('get lists from list item', () => {
  it('gets list from list item', async () => {
    const {listLogic} = buildListLogicFake();
    const user = makeUserFake();

    const [list1, list2, list3] = await listLogic.addLists(
      [1, 2, 3].map(n => ({
        ownerId: user.id,
        title: `list ${n}`,
      }))
    );

    const listItemInfo = {
      userId: user.id,
      tmdbMediaId: '550',
      tmdbMediaType: 'movie' as TmdbMediaType,
    };

    await listLogic.addListItems([
      {
        ...listItemInfo,
        listId: list1.id,
      },
      {
        ...listItemInfo,
        listId: list3.id,
      },
    ]);

    const lists = await listLogic.getListsFromListItem(listItemInfo);

    expect(lists).toContainEqual(list1);
    expect(lists).not.toContainEqual(list2);
    expect(lists).toContainEqual(list3);
  });
});
