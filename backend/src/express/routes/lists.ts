import express, {Handler, Router} from 'express';
import {Id} from '../../id/types';
import {ListLogic} from '../../lists/logic/types';

export type BuildListRouter = (_: {
  attachCurrentUser: Handler;
  ListLogic: ListLogic;
}) => Router;

export const buildListRouter: BuildListRouter = ({
  attachCurrentUser,
  ListLogic,
}) => {
  const router = express.Router();
  router.use(attachCurrentUser);

  /**
   * @swagger
   * components:
   *   securitySchemes:
   *     firebaseAuth:
   *       type: http
   *       scheme: bearer
   *       bearerFormat: JWT
   *       description: firebase id token
   *
   *   parameters:
   *     listId:
   *
   *
   *   schemas:
   *     List:
   *       properties:
   *         id:
   *           type: string
   *         title:
   *           type: string
   *         description:
   *           type: string
   *         userIds:
   *           type: array
   *           items:
   *             type: string
   *     ListInfo:
   *       properties:
   *         title:
   *           type: string
   *         description:
   *           type: string
   *
   * security:
   *   - firebaseAuth: []
   */

  /**
   * @swagger
   * /lists:
   *   get:
   *     tags:
   *     - "Lists"
   *     summary: get all the lists for a user
   */
  router.get('/lists', async (req, res) => {
    const {currentUser} = req;
    const listInfo = {
      userId: currentUser.id,
    };
    const lists = await ListLogic.getListsByUser(listInfo);

    res.json({
      page: 1,
      results: lists,
    });
  });

  /**
   * @swagger
   * /lists:
   *   post:
   *     tags:
   *     - "Lists"
   *     summary: create a new list
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: "#/components/schemas/ListInfo"
   *     responses:
   *       '201':
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/List"
   *
   */
  router.post('/lists', async (req, res) => {
    const {currentUser} = req;
    const {title, description} = req.body;
    const list = await ListLogic.createList({
      title,
      description,
      userIds: [currentUser.id],
    });
    res.status(201).json(list);
  });

  /**
   * @swagger
   * /lists/{listId}:
   *   get:
   *     tags:
   *     - "Lists"
   *     summary: get all the lists for a user
   *     parameters:
   *       - in: path
   *         name: listId
   *         schema:
   *           type: string
   *         required: true
   
   */

  router.get('/lists/:listId', async (req, res) => {
    const listId = req.params.listId as Id;

    const list = await ListLogic.getList({listId});

    if (!list) {
      return res.status(404).end();
    }

    const items = await ListLogic.getItems({listId});

    res
      .json({
        ...list,
        items: {
          page: 1,
          results: items,
        },
      })
      .end();
  });

  /**
   * @swagger
   * /lists/{listId}:
   *   delete:
   *     tags:
   *     - "Lists"
   *     summary: delete a list
   */
  router.delete('/lists/:listId', async (req, res) => {
    const {currentUser} = req;
    const listId = req.params.listId as Id;
    await ListLogic.deleteList({userId: currentUser.id, listId});
    res.status(200).end();
  });

  /**
   * @swagger
   * /lists/{listId}/items:
   *   post:
   *     tags:
   *     - "Lists"
   *     summary: add a item to a list
   */
  router.post('/lists/:listId/items', async (req, res) => {
    const {tmdbId, tmdbMediaType} = req.body;
    const listId = req.params.listId as Id;

    await ListLogic.addItem({
      listId,
      tmdbId,
      tmdbMediaType,
    });

    res.status(201).json({
      listId,
      tmdbId,
      tmdbMediaType,
    });
  });

  /**
   * @swagger
   * /lists/{listId}/items/{itemId}:
   *    delete:
   *      tags:
   *      - "Lists"
   *      summary: remove an item from a list
   *
   */
  router.delete('/lists/:listId/items/:itemId', async (req, res) => {
    res.end();
  });

  const errorHandler: express.ErrorRequestHandler = (err, req, res, next) => {
    if (err) {
      res
        .status(400)
        .json({
          message: err.message,
        })
        .end();
    } else {
      next();
    }
  };
  router.use(errorHandler);

  return router;
};
