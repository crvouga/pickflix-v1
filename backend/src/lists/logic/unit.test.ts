import {makeId} from '../../id';
import {makeListItem} from '../models';
import {buildListLogicFake} from './build.fake';

const {ListLogic} = buildListLogicFake();

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
    const listItem = makeListItem({
      listId: makeId(),
      tmdbMediaType: 'movie',
      tmdbMediaId: '43',
    });
    const before = await ListLogic.getListItems({listId: listItem.listId});
    await ListLogic.addListItems([listItem]);
    const after = await ListLogic.getListItems({listId: listItem.listId});

    expect(before).not.toContainEqual(listItem);
    expect(after).toContainEqual(listItem);
  });

  it('only allows DISTINCT items in same list', async () => {
    const [listItem, ...restOfListItems] = await ListLogic.addListItems(
      [1, 2, 3, 4, 5].map(n => ({
        listId: makeId(),
        tmdbMediaId: '43',
        tmdbMediaType: 'movie',
      }))
    );

    const after = await ListLogic.getListItems({listId: listItem.listId});
    expect(after).toEqual(
      expect.arrayContaining([expect.objectContaining(listItem)])
    );
  });

  it('removes item from db', async () => {
    const [listItem] = await ListLogic.addListItems([
      {
        listId: makeId(),
        tmdbMediaId: '42',
        tmdbMediaType: 'movie',
      },
    ]);
    const before = await ListLogic.getListItems({listId: listItem.listId});
    await ListLogic.removeListItems([{id: listItem.id}]);
    const after = await ListLogic.getListItems({listId: listItem.listId});

    expect(before).toContainEqual(listItem);
    expect(after).not.toContainEqual(listItem);
  });

  it('gets items for a specific list', async () => {
    const listId1 = makeId();
    const listId2 = makeId();

    const [item1, item2, item3] = await ListLogic.addListItems([
      {
        listId: listId1,
        tmdbMediaId: '34',
        tmdbMediaType: 'movie',
      },
      {
        listId: listId1,
        tmdbMediaId: '35',
        tmdbMediaType: 'movie',
      },
      {
        listId: listId2,
        tmdbMediaId: '34',
        tmdbMediaType: 'movie',
      },
    ]);

    const list1 = await ListLogic.getListItems({listId: listId1});
    const list2 = await ListLogic.getListItems({listId: listId2});

    expect(list1).toStrictEqual([item1, item2]);
    expect(list2).toStrictEqual([item3]);
  });
});

describe('list logic', () => {
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

  it('get all list for a specific user AND flag all with tmdbMediaIds ', async () => {
    const {createList, getListsByUser} = ListLogic;
    const userId = makeId();

    const before1 = await createList({
      userIds: [userId],
      title: '1',
    });
    const before2 = await createList({
      userIds: [userId],
      title: '2',
    });

    const tmdbMediaId = '42';
    await ListLogic.addListItems([
      {
        tmdbMediaType: 'movie',
        tmdbMediaId,
        listId: before1.id,
      },
    ]);

    const lists = await getListsByUser({userId, tmdbMediaIds: [tmdbMediaId]});

    const after1 = lists.filter(_ => _.id === before1.id)[0];
    const after2 = lists.filter(_ => _.id === before2.id)[0];

    expect(after1.tmdbMediaIds).toStrictEqual([tmdbMediaId]);
    expect(after2.tmdbMediaIds).toBeFalsy();
  });

  describe('edit a list', () => {
    it('resolves with edited list', async () => {
      const userId = makeId();
      const before = await ListLogic.createList({
        title: 'my movies',
        userIds: [userId],
      });
      const edits = {
        title: 'My Movies!!!',
      };
      const after = await ListLogic.editList({listId: before.id, ...edits});
      expect(after).not.toMatchObject(before);
    });

    it('rejects if list does not exists', async () => {
      const listId = makeId();
      const edits = {
        title: 'My Movies!!!',
      };
      expect(ListLogic.editList({listId, ...edits})).rejects.toBeTruthy();
    });

    it('rejects if invalid edit', async () => {
      const listId = makeId();
      const edits = {
        title: '',
      };
      expect(ListLogic.editList({listId, ...edits})).rejects.toBeTruthy();
    });
  });
});

describe('get lists by tmdbMediaId', () => {
  it('gets specific list by tmdbMediaId', async () => {
    const userId = makeId();

    const list1 = await ListLogic.createList({
      title: '1',
      userIds: [userId],
    });
    const list2 = await ListLogic.createList({
      title: '2',
      userIds: [userId],
    });
    const list3 = await ListLogic.createList({
      title: '2',
      userIds: [userId],
    });

    const tmdbMediaId1 = '1';
    const tmdbMediaId2 = '2';

    await ListLogic.addListItems([
      {
        tmdbMediaId: tmdbMediaId1,
        listId: list1.id,
        tmdbMediaType: 'movie',
      },
      {
        tmdbMediaId: tmdbMediaId1,
        listId: list2.id,
        tmdbMediaType: 'movie',
      },
      {
        tmdbMediaId: tmdbMediaId2,
        listId: list3.id,
        tmdbMediaType: 'movie',
      },
    ]);

    const lists = await ListLogic.getListsBytmdbMediaId({
      tmdbMediaId: tmdbMediaId1,
    });
    expect(lists).toContainEqual(list1);
    expect(lists).toContainEqual(list2);
    expect(lists).not.toContainEqual(list3);
  });
});
