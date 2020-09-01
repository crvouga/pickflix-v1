const { makeFakeTodoItem } = require("../__test__/todo-item");
const { makeFakeUser } = require("../../user/__test__/user");
const { buildTodoItemsDb } = require("../__test__/todo-items-db.mock");
const { buildAddItem } = require("./add-item");
const { buildEditItem } = require("./edit-item");

const todoItemsDb = buildTodoItemsDb();
const addItem = buildAddItem({ todoItemsDb });
const editItem = buildEditItem({ todoItemsDb });

describe("edit item", () => {
  it("changes item text", async () => {
    const user = makeFakeUser();

    const before = await addItem(
      makeFakeTodoItem({ userId: user.id, text: "before" })
    );
    const after = await editItem({ id: before.id, text: "after" });

    const { text: textBefore, ...restOfBefore } = before;
    const { text: textAfter, ...restOfAfter } = after;

    expect(textAfter).not.toEqual(textBefore);
    expect(restOfAfter).toEqual(restOfBefore);
  });

  it("requires changes", async () => {
    const user = makeFakeUser();
    const added = await addItem(makeFakeTodoItem({ userId: user.id }));
    expect(editItem({ id: added.id })).rejects.toBeTruthy();
  });

  it("requires item to exists", async () => {
    const user = makeFakeUser();
    const notAdded = makeFakeTodoItem({ userId: user.id });
    expect(editItem({ id: notAdded.id })).rejects.toBeTruthy();
  });
});
