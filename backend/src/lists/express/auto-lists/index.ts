import {Handler, IRouter} from 'express';
import {param, validationResult} from 'express-validator';
import {User} from '../../../users/models/types';
import {AutoListKeys} from '../../models/types';
import {Dependencies} from '../types';

const handleValidationResult: Handler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  next();
};

export const autoLists = ({listLogic, middlewares}: Dependencies) => (
  router: IRouter
) => {
  const autoListMiddlewares = [
    middlewares.attachCurrentUser,
    param('autoListKey').isIn(Object.values(AutoListKeys)),
    handleValidationResult,
  ];

  router.get(
    '/auto-lists/:autoListKey',
    ...autoListMiddlewares,
    async (req, res, next) => {
      try {
        const autoListKey = req.params.autoListKey as AutoListKeys;
        const currentUser = req.currentUser as User;

        const autoLists = await listLogic.getAutoLists({
          key: autoListKey,
          ownerId: currentUser.id,
        });

        if (autoLists.length === 0) {
          return res.status(404).end();
        }

        res.json(autoLists[0]).end();
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/auto-lists/:autoListKey/list-items',
    ...autoListMiddlewares,
    async (req, res, next) => {
      try {
        const currentUser = req.currentUser as User;
        const autoListKey = req.params.autoListKey as AutoListKeys;
        const {tmdbMediaId, tmdbMediaType} = req.body;

        const autoLists = await listLogic.getAutoLists({
          key: autoListKey,
          ownerId: currentUser.id,
        });

        if (autoLists.length === 0) {
          return res.status(404).end();
        }

        await listLogic.addListItems([
          {
            userId: currentUser.id,
            listId: autoLists[0].id,
            tmdbMediaId,
            tmdbMediaType,
          },
        ]);

        res.status(201).end();
      } catch (err) {
        res.status(400).json({message: 'failed to add item to list'}).end();
      }
    }
  );
};
