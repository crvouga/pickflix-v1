import {makeTodoItem} from '../business-entities';
import {TodoItem} from '../business-entities/todo-item';
import {TodoItemsDb} from '../data-access/TodoItemsDb';

export type AddItem = (_: Partial<TodoItem>) => Promise<TodoItem>;
type Build = (dependencies: {db: TodoItemsDb}) => AddItem;

export const buildAddItem: Build = ({db}) => async todoInfo => {
  const todoItem = makeTodoItem(todoInfo);
  await db.insert(todoItem);
  return todoItem;
};
