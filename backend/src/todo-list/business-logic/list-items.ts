import {TodoItemsDb} from '../data-access/TodoItemsDb';
import {TodoItem} from '../business-entities/todo-item';

export type ListItems = (_: Partial<TodoItem>) => Promise<TodoItem[]>;
type Dependencies = {
  db: TodoItemsDb;
};
type Build = (_: Dependencies) => ListItems;

const build: Build = ({db}) => async todoItemInfo => {
  const {userId} = todoItemInfo;
  if (!userId) {
    throw new Error('user id required');
  }
  const todoItems = await db.findAllByUserId(userId);
  return todoItems;
};

export default build;
