import {TodoItemsDb} from '../data-access/TodoItemsDb';
import {TodoItem} from '../business-entities/todo-item';

export type RemoveItem = (_: Partial<TodoItem>) => Promise<boolean>;
type Dependencies = {
  db: TodoItemsDb;
};
type Build = (_: Dependencies) => RemoveItem;

const build: Build = ({db}) => async todoItemInfo => {
  const {id} = todoItemInfo;
  if (!id) {
    throw new Error('id required');
  }
  return await db.remove(id);
};

export default build;
