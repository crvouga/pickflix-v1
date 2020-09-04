import {TodoItemsDb} from './TodoItemsDb';
import {TodoItem} from '../business-entities/todo-item';

type Build = () => TodoItemsDb;

export const buildTodoItemDb: Build = () => {
  const map = new Map<string, TodoItem>();

  const insert = async (todoItem: TodoItem): Promise<TodoItem> => {
    map.set(todoItem.id, todoItem);
    return todoItem;
  };

  const remove = async (id: string) => {
    map.delete(id);
    return true;
  };

  const update = async (todoItem: TodoItem): Promise<TodoItem> => {
    const updated = {...map.get(todoItem.id), ...todoItem};
    map.set(todoItem.id, updated);
    return updated;
  };

  const findById = async (id: string): Promise<TodoItem | undefined> => {
    return map.get(id);
  };

  const findAllByUserId = async (userId: string): Promise<TodoItem[]> => {
    return Array.from(map.values()).filter(_ => _.userId === userId);
  };

  return {
    insert,
    remove,
    update,
    findById,
    findAllByUserId,
  };
};
