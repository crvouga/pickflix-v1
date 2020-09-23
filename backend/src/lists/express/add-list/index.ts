import express from 'express';
import {Dependencies} from '../types';

export const addList = ({listLogic, middlewares}: Dependencies) => {
  const router = express.Router({mergeParams: true});

  router.use(middlewares.attachCurrentUser);
  router.post('/lists', async (req, res) => {
    const currentUser = req.currentUser;
    const {title, description} = req.body;
    const [list] = await listLogic.addLists([
      {
        ownerId: currentUser.id,
        title,
        description,
      },
    ]);
    res.status(201).json(list);
  });

  return router;
};
