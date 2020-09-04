import {Db} from '../../infrastructure/postgres/Db';
import {makeTodoItem} from '../business-entities';
import {TodoItem} from '../business-entities/todo-item';
import {TodoItemsDb} from './TodoItemsDb';

type Build = (dependencies: {makeDb: () => Promise<Db>}) => TodoItemsDb;

type Row = {
  id: string;
  user_id: string;
  text_: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
};

const rowToEntity = (row: Row): TodoItem | undefined => {
  if (!row) {
    return undefined;
  }
  const {id, user_id, text_, completed, created_at, updated_at} = row;
  const todoItem = makeTodoItem({
    id,
    userId: user_id,
    text: text_,
    completed,
    createdAt: new Date(Date.parse(created_at)),
    updatedAt: new Date(Date.parse(updated_at)),
  });
  return todoItem;
};

export const buildTodoItemDb: Build = ({makeDb}) => {
  const insert = async (todoItem: TodoItem): Promise<TodoItem> => {
    const {id, userId, text, completed, createdAt, updatedAt} = todoItem;

    const query = `
      INSERT INTO todo_items 
        (
          id, 
          user_id, 
          text_, 
          completed, 
          created_at, 
          updated_at
        )
      VALUES
        (
          '${id}', 
          '${userId}', 
          '${text}', 
          ${completed},
          '${createdAt.toISOString()}', 
          '${updatedAt.toISOString()}'
        )
      RETURNING *`;

    const db = await makeDb();
    const res = await db.query(query);

    return res.rows.map(rowToEntity)[0];
  };

  const remove = async (id: string): Promise<boolean> => {
    const query = `
      DELETE FROM todo_items
      WHERE id='${id}'`;
    const db = await makeDb();
    await db.query(query);
    return true;
  };

  const update = async (todoItem: TodoItem): Promise<TodoItem> => {
    const {id, text, completed} = todoItem;

    const query = `
      UPDATE todo_items 
      SET
        text_ = '${text}', 
        completed = ${completed}
      WHERE
        id='${id}'
      RETURNING *`;

    const db = await makeDb();
    const res = await db.query(query);
    return res.rows.map(rowToEntity)[0];
  };

  const findById = async (id: string): Promise<TodoItem | undefined> => {
    const query = `
      SELECT * FROM todo_items WHERE id='${id}'`;
    const db = await makeDb();
    const res = await db.query(query);
    return res.rows.map(rowToEntity)[0];
  };

  const findAllByUserId = async (userId: string): Promise<TodoItem[]> => {
    const query = `
      SELECT * FROM todo_items
      WHERE user_id='${userId}'`;
    const db = await makeDb();
    const res = await db.query(query);
    return res.rows.map(rowToEntity);
  };

  return {
    insert,
    remove,
    update,
    findById,
    findAllByUserId,
  };
};
