import express, {IRouter} from 'express';
import {Id} from '../../../id/types';
import {Dependencies} from '../types';

export const getListItems = ({listLogic}: Dependencies) => (
  router: IRouter
) => {
  router.get('/lists/:listId/list-items', async (req, res, next) => {
    try {
      const listId = req.params.listId as Id;
      const listItems = await listLogic.getListItems({listId});
      res.json(listItems);
    } catch (error) {
      next(error);
    }
  });
};
