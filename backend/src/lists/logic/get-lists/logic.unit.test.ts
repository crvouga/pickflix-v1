import {buildListLogicFake} from '../build.fake';
import {makeUserFake} from '../../../users/models/make-user.fake';

describe('getting lists', () => {
  it('gets aggergated lists by ownerId or listId', async () => {
    const {ListLogic} = buildListLogicFake();
    const user = makeUserFake();
    const [list] = await ListLogic.addLists([
      {
        ownerId: user.id,
        title: 'my list',
      },
    ]);
    const [listItem] = await ListLogic.addListItems([
      {
        listId: list.id,
        tmdbMediaId: '550',
        tmdbMediaType: 'movie',
      },
    ]);

    const [aggergatedList1] = await ListLogic.getLists({listId: list.id});
    const [aggergatedList2] = await ListLogic.getLists({ownerId: user.id});

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
