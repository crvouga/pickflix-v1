import {Handler} from 'express';
import {Id} from '../../id/types';
import {BuildListHandlers} from './types';

export const buildListHandlers: BuildListHandlers = ({ListLogic}) => {
  const getList: Handler = async (req, res) => {
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
  };

  const getLists: Handler = async (req, res) => {
    const {currentUser} = req;

    const listInfo = {
      userId: currentUser.id,
    };

    const lists = await ListLogic.getListsByUser(listInfo);

    res.json({
      page: 1,
      results: lists,
    });
  };

  const deleteList: Handler = async (req, res) => {
    const {currentUser} = req;
    const listId = req.params.listId as Id;
    await ListLogic.deleteList({userId: currentUser.id, listId});
    res.status(200).end();
  };

  const deleteListItem: Handler = async (req, res) => {
    res.end();
  };

  const postList: Handler = async (req, res) => {
    const {currentUser} = req;
    const {title, description} = req.body;
    const list = await ListLogic.createList({
      title,
      description,
      userIds: [currentUser.id],
    });
    res.status(201).json(list);
  };

  const postListItem: Handler = async (req, res) => {
    const {tmdbId, tmdbMediaType} = req.body;
    const listId = req.params.listId as Id;

    const listItem = await ListLogic.addItem({
      listId,
      tmdbId,
      tmdbMediaType,
    });

    res.status(201).json(listItem);
  };

  return {
    getList,
    getLists,
    deleteList,
    postList,
    postListItem,
    deleteListItem,
  };
};
