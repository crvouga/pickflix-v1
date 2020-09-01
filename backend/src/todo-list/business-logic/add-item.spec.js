const { makeFakeUser } = require("../../../__test__/fixtures/user");
const { buildTodoItemsDb } = require("../data-access/todo-items-db.mock");
const { buildAddItem } = require("./add-item");
const { buildListItems } = require("./list-items");

const todoItemsDb = buildTodoItemsDb();
const addItem = buildAddItem({ todoItemsDb });
const listItems = buildListItems({ todoItemsDb });

describe("adding an item to todo list", () => {
  it("adds an item", async () => {
    const user = makeFakeUser();
    const todoInfo = { userId: user.id, text: "finish stuff" };
    const added = await addItem(todoInfo);
    expect(await listItems({ userId: user.id })).toContainEqual(added);
  });
});
