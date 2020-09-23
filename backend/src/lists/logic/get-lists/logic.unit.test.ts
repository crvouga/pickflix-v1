import {buildListLogicFake} from '../build.fake';
import {makeUserFake} from '../../../users/models/make-user.fake';

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
