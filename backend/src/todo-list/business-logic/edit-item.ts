import {makeTodoItem} from '../business-entities';
import {TodoItemsDb} from '../data-access/TodoItemsDb';
import {TodoItem} from '../business-entities/todo-item';

export type EditItem = (_: Partial<TodoItem>) => Promise<TodoItem>;
type Build = (dependencies: {db: TodoItemsDb}) => EditItem;

export const buildEditItem: Build = ({db}) => async todoItemInfo => {
  const {id, ...changes} = todoItemInfo;
  if (!id) {
    throw new Error('id required');
  }

  if (!changes.text && !changes.completed) {
    throw new Error('changes required');
  }

  const existing = await db.findById(id);

  if (!existing) {
    throw new Error('can not edit item that does not exist');
  }

  const edited = makeTodoItem({...existing, ...changes});

  await db.update(edited);

  return edited;
};
