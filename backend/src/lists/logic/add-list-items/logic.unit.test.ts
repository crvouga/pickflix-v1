import {buildListLogicFake} from '../build.fake';
import {makeId} from '../../../id';
describe('add list items to list', () => {
  it('throws if duplicate list items', async () => {
    const {ListLogic} = buildListLogicFake();

    const [list] = await ListLogic.addLists([
      {
        ownerId: makeId(),
        title: 'my list',
      },
    ]);

    expect(
      ListLogic.addListItems([
        {
          listId: list.id,
          tmdbMediaId: '550',
          tmdbMediaType: 'movie',
        },
        {
          tmdbMediaId: '550',
          listId: list.id,
          tmdbMediaType: 'movie',
        },
        {
          tmdbMediaId: '550',
          tmdbMediaType: 'movie',
          listId: list.id,
        },
      ])
    ).rejects.toBeTruthy();
  });
  it('throws if trying to add dupicate item', () => {});
});
