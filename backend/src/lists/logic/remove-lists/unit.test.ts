import {buildListLogicFake} from '../build.fake';
import {makeUserFake} from '../../../users/models/make-user.fake';

describe('remove lists', () => {
  it('can not remove auto list', async () => {
    const {listLogic} = buildListLogicFake();
    const user = makeUserFake();
    const [list1] = await listLogic.addLists([
      {
        ownerId: user.id,
        title: 'my list',
        isAutoCreated: true,
      },
    ]);
    try {
      await listLogic.removeLists({listIds: [list1.id]});
    } catch (error) {
    } finally {
      const lists = await listLogic.getLists({ownerId: user.id});
      expect(lists).toEqual(
        expect.arrayContaining([expect.objectContaining(list1)])
      );
    }
  });
  it('removes lists', async () => {
    const {listLogic} = buildListLogicFake();
    const user = makeUserFake();
    const [list1, list2, list3] = await listLogic.addLists([
      {
        ownerId: user.id,
        title: 'my list',
      },
      {
        ownerId: user.id,
        title: 'my other list',
      },
      {
        ownerId: user.id,
        title: 'my other other list',
      },
    ]);

    await listLogic.removeLists({listIds: [list1.id, list3.id]});
    const after = await listLogic.getLists({ownerId: user.id});
    expect(after).toEqual(
      expect.arrayContaining([expect.objectContaining(list2)])
    );
  });
});
