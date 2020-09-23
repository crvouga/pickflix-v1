import express, {IRouter} from 'express';
import {Id} from '../../../id/types';
import {Dependencies} from '../types';

export const removeList = ({listLogic, middlewares}: Dependencies) => (
  router: IRouter
) => {
  router.delete(
    '/lists/:listId',
    middlewares.attachCurrentUser,
    async (req, res) => {
      const listId = req.params.listId as Id;

      try {
        await listLogic.removeLists({listIds: [listId]});

        res.status(204).end();
      } catch (error) {
        res.status(400);
      }
    }
  );
};
