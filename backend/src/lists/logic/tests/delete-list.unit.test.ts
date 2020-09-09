import {makeId} from '../../../id';
import {ListLogic} from './build';

describe('delete a list', () => {
  it('resolves when user is the only user part of list', async () => {
    const userId1 = makeId();
    const list = await ListLogic.createList({
      userIds: [userId1],
      title: 'my list',
    });

    const ret = await ListLogic.deleteList({userId: userId1, listId: list.id});
    expect(ret).toBe(true);
  });

  it('rejects when user is not part of list', async () => {
    const userId1 = makeId();
    const list = await ListLogic.createList({
      userIds: [userId1],
      title: 'my list',
    });

    const userId2 = makeId();
    expect(
      ListLogic.deleteList({userId: userId2, listId: list.id})
    ).rejects.toBeTruthy();
  });

  it('rejects when there is multiple users in list', async () => {
    const userId1 = makeId();
    const userId2 = makeId();

    const list = await ListLogic.createList({
      userIds: [userId1, userId2],
      title: 'my list',
    });

    expect(
      ListLogic.deleteList({userId: userId2, listId: list.id})
    ).rejects.toBeTruthy();
  });

  it('rejects when user  not part of list', async () => {
    const userId1 = makeId();
    const userId2 = makeId();

    const list = await ListLogic.createList({
      userIds: [userId1, userId2],
      title: 'my list',
    });

    const userId3 = makeId();

    expect(
      ListLogic.deleteList({userId: userId3, listId: list.id})
    ).rejects.toBeTruthy();
  });
});
