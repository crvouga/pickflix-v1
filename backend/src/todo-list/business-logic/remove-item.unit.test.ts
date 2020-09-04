import fc from 'fast-check';
import {arbitraryTodoItemInfo} from '../business-entities/__arbitrary__/todo-item';
import {buildTodoItemDb} from '../data-access/todo-items-db.fake';
import {buildRemoveItem} from './remove-item';
import {buildListItems} from './list-items';
import {buildAddItem} from './add-item';

const build = () => {
  const db = buildTodoItemDb();
  const addItem = buildAddItem({db});
  const listItems = buildListItems({db});
  const removeItem = buildRemoveItem({db});
  return {
    addItem,
    listItems,
    removeItem,
  };
};

describe('remove item', () => {
  it('removes item', () => {
    fc.assert(
      fc.asyncProperty(arbitraryTodoItemInfo, async todoItemInfo => {
        const {addItem, listItems, removeItem} = build();

        const added = await addItem(todoItemInfo);
        const before = await listItems({userId: added.userId});
        await removeItem({id: added.id});
        const after = await listItems({userId: added.userId});

        expect(before).toContainEqual(added);
        expect(after).not.toContainEqual(added);
      })
    );
  });
});
