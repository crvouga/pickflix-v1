import R from 'ramda';
import fc from 'fast-check';
import buildTodoItemsDb from '../data-access/todo-items-db.fake';
import buildAddItem from './add-item';
import buildListItems from './list-items';

const build = () => {
  const db = buildTodoItemsDb();
  const addItem = buildAddItem({db});
  const listItems = buildListItems({db});
  return {
    addItem,
    listItems,
  };
};

describe('list all todo items for a user', () => {
  it('requires user id', async () => {
    const {listItems} = build();
    expect(listItems({})).rejects.toBeTruthy();
  });

  it('list all items for a specific user', () => {
    fc.assert(
      fc.asyncProperty(fc.uuid(), fc.uuid(), async (userId1, userId2) => {
        const text = 'todo item text';
        const {addItem, listItems} = build();
        const added1 = await addItem({userId: userId1, text});
        const added2 = await addItem({userId: userId2, text});
        const list1 = await listItems({userId: userId1});
        const list2 = await listItems({userId: userId2});

        return (
          R.includes(added1, list1) &&
          R.not(R.includes(added2, list1)) &&
          R.includes(added2, list2) &&
          R.not(R.includes(added1, list2))
        );
      })
    );
  });
});
