import express from 'express';
import {Dependencies} from '../types';

const ensureArray = (x: any) => (Array.isArray(x) ? x : [x]);

export const getLists = ({listLogic, middlewares}: Dependencies) => (
  router: express.IRouter
) => {
  router.get(
    '/lists',
    middlewares.attachCurrentUser,
    async (req, res, next) => {
      try {
        const currentUser = req.currentUser;

        const listInfo = {
          ownerId: currentUser?.id,
        };

        const lists = await listLogic.getLists(listInfo);

        res.json(lists).end();
      } catch (error) {
        next(error);
      }
    }
  );
};
