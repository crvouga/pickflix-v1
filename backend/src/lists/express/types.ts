import {Handler, Router} from 'express';
import {ListLogic} from '../logic/types';

export interface ListHandlers {
  getList: Handler;
  getLists: Handler;
  postList: Handler;
  deleteList: Handler;
  postListItem: Handler;
  deleteListItem: Handler;
}

export type BuildListHandlers = (_: {ListLogic: ListLogic}) => ListHandlers;

export type BuildListRouter = (_: {
  attachCurrentUser: Handler;
  ListHandlers: ListHandlers;
}) => Router;
