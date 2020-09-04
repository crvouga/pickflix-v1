import {
  makeTestDb,
  clearTestDb,
} from '../../infrastructure/postgres/makeTestDb';

import buildTodoItemsDb from './todo-items-db';
import {makeArbitraryTodoItem} from '../business-entities/__arbitrary__/todo-item';

const todoItemsDb = buildTodoItemsDb({makeDb: makeTestDb});

describe('todo list db', () => {
  beforeAll(async () => {
    await clearTestDb();
  });

  afterAll(async () => {
    await clearTestDb();
  });

  it('inserting item return same item', async () => {
    const item = makeArbitraryTodoItem();
    const inserted = await todoItemsDb.insert(item);
    expect(inserted).toStrictEqual(item);
  });

  it('can insert item then find same item', async () => {
    const item = makeArbitraryTodoItem();
    const inserted = await todoItemsDb.insert(item);
    const found = await todoItemsDb.findById(item.id);
    expect(found).toStrictEqual(inserted);
  });
  it('remove item', async () => {
    const item = makeArbitraryTodoItem();
    const inserted = await todoItemsDb.insert(item);
    const before = await todoItemsDb.findById(inserted.id);
    await todoItemsDb.remove(inserted.id);
    const after = await todoItemsDb.findById(inserted.id);
    expect(before).toStrictEqual(inserted);
    expect(after).toBeFalsy();
  });
  it('find items by user id', async () => {
    const item = makeArbitraryTodoItem();
    await todoItemsDb.insert(item);
    const items = await todoItemsDb.findAllByUserId(item.userId);
    expect(items).toContainEqual(item);
  });
  it('should be falsy when item does not exists', async () => {
    const item = makeArbitraryTodoItem();
    const found = await todoItemsDb.findById(item.id);
    expect(found).toBeFalsy();
  });
  it('update an item', async () => {
    const inserted = await todoItemsDb.insert(makeArbitraryTodoItem());
    const updated = await todoItemsDb.update(
      makeArbitraryTodoItem({...inserted, text: 'CHANGED'})
    );
    const {text: insertedText, ...restOfInserted} = inserted;
    const {text: updatedText, ...restOfUpdated} = updated;
    expect(insertedText).not.toStrictEqual(updatedText);
    expect(restOfInserted).toStrictEqual(restOfUpdated);
  });
});
