import {TodoItemsDb} from '../data-access/TodoItemsDb';
import {TodoItem} from '../business-entities/todo-item';

export type RemoveItem = (_: Partial<TodoItem>) => Promise<boolean>;
type Build = (dependencies: {db: TodoItemsDb}) => RemoveItem;

export const buildRemoveItem: Build = ({db}) => async todoItemInfo => {
  const {id} = todoItemInfo;
  if (!id) {
    throw new Error('id required');
  }
  return await db.remove(id);
};
