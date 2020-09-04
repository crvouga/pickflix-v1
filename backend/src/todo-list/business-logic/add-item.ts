import {makeTodoItem} from '../business-entities';
import {TodoItem} from '../business-entities/todo-item';
import {TodoItemsDb} from '../data-access/TodoItemsDb';

export type AddItem = (_: Partial<TodoItem>) => Promise<TodoItem>;

type Dependencies = {
  db: TodoItemsDb;
};

type Build = (_: Dependencies) => AddItem;

const build: Build = ({db}) => async todoInfo => {
  const todoItem = makeTodoItem(todoInfo);
  await db.insert(todoItem);
  return todoItem;
};

export default build;
