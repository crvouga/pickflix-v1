import express, {IRouter} from 'express';
import {Id} from '../../../id/types';
import {Dependencies} from '../types';
import {ListId} from '../../models/types';

export const getListItems = ({listLogic}: Dependencies) => (
  router: IRouter
) => {
  router.get('/lists/:listId/list-items', async (req, res, next) => {
    try {
      const listId = req.params.listId as ListId;
      const listItems = await listLogic.getListItems({listId});
      res.json(listItems);
    } catch (error) {
      next(error);
    }
  });
};
