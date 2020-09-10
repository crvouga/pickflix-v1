import {makeId} from '../../id';
import {ListItemStorage, ListStorage} from '../storage/test';
import {buildListLogic} from './logic';
import {makeListItem} from '../models';
import {ListItem} from '../models/types';

export const ListLogic = buildListLogic({ListStorage, ListItemStorage});

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

describe('add item to list', () => {
  it('inserted item into db', async () => {
    const {addItem, getItems} = ListLogic;
    const item = makeListItem({
      listId: makeId(),
      tmdbMediaType: 'movie',
      tmdbId: '43',
    });
    const before = await getItems({listId: item.listId});
    await addItem(item);
    const after = await getItems({listId: item.listId});

    expect(before).not.toContainEqual(item);
    expect(after).toContainEqual(item);
  });

  it('only allows DISTINCT items in same list', async () => {
    const {addItem, getItems} = ListLogic;

    const itemInfo: Partial<ListItem> = {
      listId: makeId(),
      tmdbId: '43',
      tmdbMediaType: 'movie',
    };
    const item1 = makeListItem(itemInfo);
    const item2 = makeListItem(itemInfo);
    const item3 = makeListItem(itemInfo);
    const item4 = makeListItem(itemInfo);
    const item5 = makeListItem(itemInfo);

    await addItem(item1);
    await addItem(item2);
    await addItem(item3);
    await addItem(item4);
    await addItem(item5);

    const after = await getItems({listId: item1.listId});
    expect(after).toStrictEqual([item1]);
  });

  it('removes item from db', async () => {
    const {addItem, getItems, removeItem} = ListLogic;
    const item = makeListItem({
      listId: makeId(),
      tmdbId: '42',
      tmdbMediaType: 'movie',
    });
    await addItem(item);
    const before = await getItems({listId: item.listId});
    await removeItem({id: item.id});
    const after = await getItems({listId: item.listId});

    expect(before).toContainEqual(item);
    expect(after).not.toContainEqual(item);
  });

  it('gets items for a specific list', async () => {
    const {addItem, getItems} = ListLogic;
    const listId1 = makeId();
    const listId2 = makeId();

    const item1 = makeListItem({
      listId: listId1,
      tmdbId: '34',
      tmdbMediaType: 'movie',
    });
    const item2 = makeListItem({
      listId: listId1,
      tmdbId: '35',
      tmdbMediaType: 'movie',
    });
    const item3 = makeListItem({
      listId: listId2,
      tmdbId: '34',
      tmdbMediaType: 'movie',
    });

    await addItem(item1);
    await addItem(item2);
    await addItem(item3);

    const list1 = await getItems({listId: listId1});
    const list2 = await getItems({listId: listId2});

    expect(list1).toStrictEqual([item1, item2]);
    expect(list2).toStrictEqual([item3]);
  });
});

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
