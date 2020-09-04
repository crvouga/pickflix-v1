import {TodoItem} from '../business-entities/todo-item';

export interface TodoItemsDb {
  insert(todoItem: TodoItem): Promise<TodoItem>;
  remove(id: string): Promise<boolean>;
  update(todoItemInfo: Partial<TodoItem>): Promise<TodoItem>;
  findById(id: string): Promise<TodoItem | undefined>;
  findAllByUserId(userId: string): Promise<TodoItem[]>;
}
