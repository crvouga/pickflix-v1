import express, {IRouter} from 'express';
import {Id} from '../../../id/types';
import {Dependencies} from '../types';

export const getList = ({listLogic}: Dependencies) => (router: IRouter) => {
  router.get('/lists/:listId', async (req, res) => {
    const listId = req.params.listId as Id;

    const lists = await listLogic.getLists({id: listId});

    if (lists.length === 0) {
      return res.status(404).end();
    }
    const [list] = lists;
    res.json(list);
  });
};
