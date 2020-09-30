import {buildListLogicFake} from '../build.fake';
import {makeUserFake} from '../../../users/models/make-user.fake';
import {TmdbMediaType, TmdbMedia} from '../../../media/models/types';

describe('add lists', () => {
  it('adds lists', async () => {
    const {listLogic} = buildListLogicFake();
    const user = makeUserFake();
    const listInfo = {ownerId: user.id, title: 'my list'};
    const [added] = await listLogic.addLists([listInfo]);
    expect(added).toEqual(expect.objectContaining(listInfo));
  });

  it('adds list items if list item info is present', async () => {
    const {listLogic} = buildListLogicFake();
    const user = makeUserFake();

    const listItemInfo: TmdbMedia = {
      tmdbMediaId: '550',
      tmdbMediaType: 'movie',
    };
    const listInfo = {
      ownerId: user.id,
      title: 'my list',
    };
    const [added] = await listLogic.addLists([
      {...listInfo, listItemInfos: [listItemInfo]},
    ]);
    const [list] = await listLogic.getLists({id: added.id});

    expect(list).toEqual(expect.objectContaining(listInfo));
    expect(list.listItems).toEqual(
      expect.arrayContaining([expect.objectContaining(listItemInfo)])
    );
  });
});
