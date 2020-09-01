const { makeFakeTodoItem } = require("../../../__test__/fixtures/todo-item");
const { makeFakeUser } = require("../../../__test__/fixtures/user");
const { buildTodoItemsDb } = require("../data-access/todo-items-db.mock");
const { buildRemoveItem } = require("./remove-item");
const { buildListItems } = require("./list-items");
const { buildAddItem } = require("./add-item");

const todoItemsDb = buildTodoItemsDb();
const addItem = buildAddItem({ todoItemsDb });
const listItems = buildListItems({ todoItemsDb });
const removeItem = buildRemoveItem({ todoItemsDb });

describe("remove item", () => {
  it("removes item", async () => {
    const user = makeFakeUser();
    const item = makeFakeTodoItem({ userId: user.id });
    await addItem(item);
    const list1 = await listItems({ userId: user.id });
    await removeItem(item);
    const list2 = await listItems({ userId: user.id });
    expect(list1).toContainEqual(item);
    expect(list2).not.toContainEqual(item);
  });
});
