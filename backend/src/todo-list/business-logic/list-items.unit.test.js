const { makeFakeTodoItem } = require("../__test__/todo-item");
const makeUser = require("../../user/__test__/user");
const { buildTodoItemsDb } = require("../__test__/todo-items-db.mock");
const { buildAddItem } = require("./add-item");
const { buildListItems } = require("./list-items");

const todoItemsDb = buildTodoItemsDb();
const addItem = buildAddItem({ todoItemsDb });
const listItems = buildListItems({ todoItemsDb });

describe("list all todo items for a user", () => {
  it("list all items for a user", async () => {
    const fakeUser = makeUser();
    const fakeItem = makeFakeTodoItem({ userId: fakeUser.id });
    await addItem(fakeItem);
    const itemList = await listItems({ userId: fakeUser.id });
    expect(itemList).toContainEqual(fakeItem);
  });

  it("it only list item for a single user", async () => {
    const user1 = makeUser();
    const user2 = makeUser();
    const added1 = await addItem(makeFakeTodoItem({ userId: user1.id }));
    const added2 = await addItem(makeFakeTodoItem({ userId: user2.id }));
    expect(await listItems({ userId: user1.id })).toContainEqual(added1);
    expect(await listItems({ userId: user1.id })).not.toContainEqual(added2);
  });

  it("requires user id", async () => {
    expect(listItems({ userId: undefined })).rejects.toBeTruthy();
  });
});
