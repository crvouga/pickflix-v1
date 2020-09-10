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

    res.json(list);
  };

  const getLists: Handler = async (req, res) => {
    const {currentUser} = req;

    const listInfo = {
      userId: currentUser.id,
    };

    const lists = await ListLogic.getListsByUser(listInfo);

    res.json(lists).end();
  };

  const deleteList: Handler = async (req, res) => {
    const {currentUser} = req;
    const listId = req.params.listId as Id;

    await ListLogic.deleteList({userId: currentUser.id, listId});

    res.status(204).end();
  };

  const deleteListItem: Handler = async (req, res) => {
    const listItemId = req.params.listItemId as Id;
    await ListLogic.removeListItem({listItemId});
    res.status(204).end();
  };

  const postList: Handler = async (req, res) => {
    const {currentUser} = req;
    const {title, description} = req.body;

    await ListLogic.createList({
      title,
      description,
      userIds: [currentUser.id],
    });

    res.status(201).json({message: 'Successfully created list.'});
  };

  const postListItem: Handler = async (req, res) => {
    const {tmdbId, tmdbMediaType} = req.body;
    const listId = req.params.listId as Id;

    await ListLogic.addListItem({
      listId,
      tmdbId,
      tmdbMediaType,
    });

    res.status(201).json({message: 'Successfully added item to list.'});
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
