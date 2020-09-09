import {makeId} from '../../../id';
import {ListLogic} from './build';

describe('create a new movie tv list', () => {
  it('insert movie tv list into db', async () => {
    const {createList, getListsByUser} = ListLogic;
    const userId = makeId();
    const before = await getListsByUser({userId});
    const created = await createList({
      userIds: [userId],
      description: 'list of my movies',
      title: 'my movies',
    });
    const after = await getListsByUser({userId});

    expect(before).not.toContainEqual(created);
    expect(after).toContainEqual(created);
  });

  it('get all list for a specific user ', async () => {
    const {createList, getListsByUser} = ListLogic;
    const userId1 = makeId();
    const userId2 = makeId();
    await createList({
      userIds: [userId1],
      description: '1',
      title: '1',
    });
    await createList({
      userIds: [userId2],
      description: '2',
      title: '2',
    });
    await createList({
      userIds: [userId1, userId2],
      description: '3',
      title: '3',
    });
    const after1 = await getListsByUser({userId: userId1});
    after1.forEach(item => expect(item.userIds).toContainEqual(userId1));
  });
});
