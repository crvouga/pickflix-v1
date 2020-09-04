import R from 'ramda';
import fc from 'fast-check';
import {arbitraryTodoItemInfo} from '../business-entities/__arbitrary__/todo-item';
import {buildTodoItemDb} from '../data-access/todo-items-db.fake';
import {buildAddItem} from './add-item';
import {buildListItems} from './list-items';

const build = () => {
  const db = buildTodoItemDb();
  const addItem = buildAddItem({db});
  const listItems = buildListItems({db});
  return {addItem, listItems};
};

describe('adding an item to todo list', () => {
  it('adds an item', async () => {
    await fc.assert(
      fc.asyncProperty(arbitraryTodoItemInfo, async todoItemInfo => {
        const {addItem, listItems} = build();
        const before = await listItems({userId: todoItemInfo.userId});
        const added = await addItem(todoItemInfo);
        const after = await listItems({userId: todoItemInfo.userId});
        return R.not(R.includes(added, before)) && R.includes(added, after);
      })
    );
  });
});
