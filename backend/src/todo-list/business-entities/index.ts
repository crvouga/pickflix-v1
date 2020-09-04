import {makeId, isValidId} from '../../id';
import {buildMakeTodoItem} from './todo-item';
export const makeTodoItem = buildMakeTodoItem({makeId, isValidId});
