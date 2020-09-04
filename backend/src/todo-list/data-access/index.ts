import {makeDb} from '../../infrastructure/postgres/makeDb';
import {buildTodoItemDb} from './todo-items-db';

export const todoItemDb = buildTodoItemDb({makeDb});
