import {Handler, Router} from 'express';
import {ListLogic} from '../../lists/logic/types';

export type BuildListRouter = (_: {
  attachCurrentUser: Handler;
  ListLogic: ListLogic;
}) => Router;
