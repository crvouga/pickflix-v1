const { makeFakeUser } = require("../../user/__test__/user");
const { buildTodoItemsDb } = require("../__test__/todo-items-db.mock");
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
