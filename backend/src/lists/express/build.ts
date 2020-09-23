import express from 'express';
import {addList} from './add-list';
import {addListItem} from './add-list-item';
import {editList} from './edit-list';
import {getList} from './get-list';
import {getListItems} from './get-list-items';
import {getLists} from './get-lists';
import {removeList} from './remove-list';
import {removeListItem} from './remove-list-item';
import {Dependencies} from './types';

const routersBuilders = [
  addList,
  addListItem,
  editList,
  getList,
  getLists,
  getListItems,
  removeList,
  removeListItem,
];

export const buildListRouter = (dependencies: Dependencies) => {
  const router = express.Router();

  for (const buildRouter of routersBuilders) {
    router.use(buildRouter(dependencies));
  }

  return router;
};
