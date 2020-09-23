import express from 'express';
import {Dependencies} from '../types';

const ensureArray = (x: any) => (Array.isArray(x) ? x : [x]);

export const getLists = ({listLogic, middlewares}: Dependencies) => {
  const router = express.Router();

  router.use(middlewares.attachCurrentUser);

  router.get('/lists', async (req, res) => {
    const currentUser = req.currentUser;
    const listInfo = {
      ownerId: currentUser.id,
    };
    const lists = await listLogic.getLists(listInfo);
    res.json(lists).end();
  });

  return router;
};
