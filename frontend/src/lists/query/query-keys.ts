export const lists = () => ["user", "lists"];

export const list = (listId: string) => ["user", "lists", listId];

export const listItems = (listId: string) => [
  "user",
  "lists",
  listId,
  "list-items",
];

export const watchNextList = () => ["user", "watch-next"];
