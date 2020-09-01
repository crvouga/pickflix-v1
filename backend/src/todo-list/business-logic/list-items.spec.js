const { makeFakeTodoItem } = require("../../../__test__/fixtures/todo-item");
const { makeFakeUser } = require("../../../__test__/fixtures/user");
const { buildTodoItemsDb } = require("../data-access/todo-items-db.mock");
const { buildAddItem } = require("./add-item");
const { buildListItems } = require("./list-items");

const todoItemsDb = buildTodoItemsDb();
const addItem = buildAddItem({ todoItemsDb });
const listItems = buildListItems({ todoItemsDb });

describe("list all todo items for a user", () => {
  it("list all items for a user", async () => {
    const fakeUser = makeFakeUser();
    const fakeItem = makeFakeTodoItem({ userId: fakeUser.id });
    await addItem(fakeItem);
    const itemList = await listItems({ userId: fakeUser.id });
    expect(itemList).toContainEqual(fakeItem);
  });

  it("it only list item for a single user", async () => {
    const user1 = makeFakeUser();
    const user2 = makeFakeUser();
    const added1 = await addItem(makeFakeTodoItem({ userId: user1.id }));
    const added2 = await addItem(makeFakeTodoItem({ userId: user2.id }));
    expect(await listItems({ userId: user1.id })).toContainEqual(added1);
    expect(await listItems({ userId: user1.id })).not.toContainEqual(added2);
  });

  it("requires user id", async () => {
    expect(listItems({ userId: undefined })).rejects.toBeTruthy();
  });
});
