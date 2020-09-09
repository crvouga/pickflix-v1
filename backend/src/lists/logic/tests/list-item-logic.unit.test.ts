import {buildListLogic} from '../list-logic';
import {makeId} from '../../../id';
import {makeListItem} from '../../models';
import {ListItem} from '../../models/types';
import {buildListItemStorage} from '../../storage/list-item-storage.fake';
import {buildListStorage} from '../../storage/list-storage.fake';

const build = () =>
  buildListLogic({
    ListStorage: buildListStorage(),
    ListItemStorage: buildListItemStorage(),
  });

describe('add item to list', () => {
  it('inserted item into db', async () => {
    const {addItem, getItems} = build();
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
    const {addItem, getItems} = build();

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
    const {addItem, getItems, removeItem} = build();
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
    const {addItem, getItems} = build();
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
