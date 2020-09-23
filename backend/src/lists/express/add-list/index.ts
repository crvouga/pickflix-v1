import express from 'express';
import {Dependencies} from '../types';

export const addList = ({listLogic, middlewares}: Dependencies) => (
  router: express.IRouter
) => {
  router.post('/lists', middlewares.attachCurrentUser, async (req, res) => {
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
};
