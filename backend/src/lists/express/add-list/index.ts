import express from 'express';
import {User} from '../../../users/models/make-user';
import {Dependencies} from '../types';

export const addList = ({listLogic, middlewares}: Dependencies) => (
  router: express.IRouter
) => {
  router.post('/lists', middlewares.protected, async (req, res, next) => {
    try {
      const user = req.user as User;
      const title = req.body.title as string;
      const description = req.body.description as string;

      const [list] = await listLogic.addLists([
        {
          ownerId: user.id,
          title,
          description,
        },
      ]);

      res.status(201).json(list);
    } catch (error) {
      next(error);
    }
  });
};
