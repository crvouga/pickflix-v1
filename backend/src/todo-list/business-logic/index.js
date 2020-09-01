const { todoItemsDb } = require("../data-access");

const { buildAddItem } = require("./add-item");
const { buildRemoveItem } = require("./remove-item");
const { buildEditItem } = require("./edit-item");
const { buildListItems } = require("./list-items");

const addItem = buildAddItem({ todoItemsDb });
const removeItem = buildRemoveItem({ todoItemsDb });
const editItem = buildEditItem({ todoItemsDb });
const listItems = buildListItems({ todoItemsDb });

module.exports = {
  addItem,
  removeItem,
  editItem,
  listItems,
};
