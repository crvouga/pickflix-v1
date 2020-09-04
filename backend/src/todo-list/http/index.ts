import {authenticateRequest} from '../../user/http';

import {addItem, removeItem, editItem, listItems} from '../business-logic';

import {buildGetTodo} from './get-todo';
import {buildPostTodo} from './post-todo';
import {buildPatchTodo} from './patch-todo';
import {buildDeleteTodo} from './delete-todo';
import {buildTodo} from './todo';

export const deleteTodo = buildDeleteTodo({authenticateRequest, removeItem});
export const postTodo = buildPostTodo({authenticateRequest, addItem});
export const getTodo = buildGetTodo({authenticateRequest, listItems});
export const patchTodo = buildPatchTodo({authenticateRequest, editItem});

export const todo = buildTodo({deleteTodo, patchTodo, postTodo, getTodo});
