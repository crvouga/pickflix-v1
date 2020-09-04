import {makeDb} from '../../infrastructure/postgres/makeDb';
import buildTodoItemsDb from './todo-items-db';

export const todoItemsDb = buildTodoItemsDb({makeDb});
