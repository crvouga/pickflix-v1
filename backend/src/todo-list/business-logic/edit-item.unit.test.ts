import fc from 'fast-check';
import R from 'ramda';
import {arbitraryTodoItemInfo} from '../business-entities/__arbitrary__/todo-item';

import {buildTodoItemDb} from '../data-access/todo-items-db.fake';
import {buildAddItem} from './add-item';
import {buildEditItem} from './edit-item';

const build = () => {
  const db = buildTodoItemDb();
  const addItem = buildAddItem({db});
  const editItem = buildEditItem({db});

  return {
    addItem,
    editItem,
  };
};

describe('edit item', () => {
  it('changes item text', async () => {
    await fc.assert(
      fc.asyncProperty(arbitraryTodoItemInfo, async todoInfo => {
        const {addItem, editItem} = build();

        const before = await addItem(todoInfo);
        const after = await editItem({
          id: before.id,
          text: before.text + '!',
        });
        const {text: textAfter, ...restOfBefore} = before;
        const {text: textBefore, ...restOfAfter} = after;
        return (
          R.not(R.equals(textAfter, textBefore)) &&
          R.equals(restOfAfter, restOfBefore)
        );
      })
    );
  });

  it('rejects if no changes', async () => {
    await fc.assert(
      fc.asyncProperty(arbitraryTodoItemInfo, async todoItemInfo => {
        const {addItem, editItem} = build();
        const added = await addItem(todoItemInfo);
        try {
          await editItem({
            id: added.id,
          });
          return false;
        } catch (error) {
          return true;
        }
      })
    );
  });

  it('requires item to exists', async () => {
    await fc.assert(
      fc.asyncProperty(fc.uuid(), async todoItemId => {
        const {editItem} = build();
        try {
          await editItem({
            id: todoItemId,
            text: 'changed',
          });
          return false;
        } catch (error) {
          return true;
        }
      })
    );
  });
});
