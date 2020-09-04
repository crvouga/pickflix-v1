import {
  clearTestDb,
  makeTestDb,
} from '../../infrastructure/postgres/makeTestDb';
import {makeArbitraryTodoItem} from '../business-entities/__arbitrary__/todo-item';
import {buildTodoItemDb} from './todo-items-db';

const todoItemDb = buildTodoItemDb({makeDb: makeTestDb});

describe('todo list db', () => {
  beforeAll(async () => {
    await clearTestDb();
  });

  afterAll(async () => {
    await clearTestDb();
  });

  it('inserting item return same item', async () => {
    const item = makeArbitraryTodoItem();
    const inserted = await todoItemDb.insert(item);
    expect(inserted).toStrictEqual(item);
  });

  it('can insert item then find same item', async () => {
    const item = makeArbitraryTodoItem();
    const inserted = await todoItemDb.insert(item);
    const found = await todoItemDb.findById(item.id);
    expect(found).toStrictEqual(inserted);
  });
  it('remove item', async () => {
    const item = makeArbitraryTodoItem();
    const inserted = await todoItemDb.insert(item);
    const before = await todoItemDb.findById(inserted.id);
    await todoItemDb.remove(inserted.id);
    const after = await todoItemDb.findById(inserted.id);
    expect(before).toStrictEqual(inserted);
    expect(after).toBeFalsy();
  });
  it('find items by user id', async () => {
    const item = makeArbitraryTodoItem();
    await todoItemDb.insert(item);
    const items = await todoItemDb.findAllByUserId(item.userId);
    expect(items).toContainEqual(item);
  });
  it('should be falsy when item does not exists', async () => {
    const item = makeArbitraryTodoItem();
    const found = await todoItemDb.findById(item.id);
    expect(found).toBeFalsy();
  });
  it('update an item', async () => {
    const inserted = await todoItemDb.insert(makeArbitraryTodoItem());
    const updated = await todoItemDb.update(
      makeArbitraryTodoItem({...inserted, text: 'CHANGED'})
    );
    const {text: insertedText, ...restOfInserted} = inserted;
    const {text: updatedText, ...restOfUpdated} = updated;
    expect(insertedText).not.toStrictEqual(updatedText);
    expect(restOfInserted).toStrictEqual(restOfUpdated);
  });
});
