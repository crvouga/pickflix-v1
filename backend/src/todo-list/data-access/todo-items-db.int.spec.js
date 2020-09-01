const { makeDb } = require("../../infrastructure/postgres/makeDb");
const makeUser = require("../../user/__test__/user");
const { makeFakeTodoItem } = require("../__test__/todo-item");
const { buildTodoItemsDb } = require("./todo-items-db");
const buildUserDb = require("../../user/data-access/user-db");

const userDb = buildUserDb({ makeDb });
const todoItemsDb = buildTodoItemsDb({ makeDb });

const user = makeUser();

describe("todo list db", () => {
  beforeAll(async () => {
    await userDb.insert(user);
  });

  it("inserting item return same item", async () => {
    const item = makeFakeTodoItem({ userId: user.id });
    const inserted = await todoItemsDb.insert(item);
    expect(inserted).toStrictEqual(item);
  });

  it("can insert item then find same item", async () => {
    const inserted = await todoItemsDb.insert(
      makeFakeTodoItem({ userId: user.id })
    );
    const found = await todoItemsDb.findById({ id: inserted.id });
    expect(found).toStrictEqual(inserted);
  });

  it("remove item", async () => {
    const inserted = await todoItemsDb.insert(
      makeFakeTodoItem({ userId: user.id })
    );
    const before = await todoItemsDb.findById(inserted);
    await todoItemsDb.remove(inserted);
    const after = await todoItemsDb.findById(inserted);

    expect(before).toStrictEqual(inserted);
    expect(after).toBeFalsy();
  });

  it("find items by user id", async () => {
    const user = makeUser();
    await userDb.insert(user);
    const item = makeFakeTodoItem({ userId: user.id });
    await todoItemsDb.insert(item);
    const items = await todoItemsDb.findAllByUserId({ userId: user.id });
    expect(items).toEqual([item]);
  });

  it("should be falsy when item does not exists", async () => {
    const item = makeFakeTodoItem();
    const found = await todoItemsDb.findById({ id: item.id });
    expect(found).toBeFalsy();
  });

  it("update an item", async () => {
    const inserted = await todoItemsDb.insert(
      makeFakeTodoItem({ userId: user.id })
    );
    const updated = await todoItemsDb.update(
      makeFakeTodoItem({ ...inserted, text: "CHANGED" })
    );

    const { text: insertedText, ...restOfInserted } = inserted;
    const { text: updatedText, ...restOfUpdated } = updated;
    expect(insertedText).not.toStrictEqual(updatedText);
    expect(restOfInserted).toStrictEqual(restOfUpdated);
  });
});
