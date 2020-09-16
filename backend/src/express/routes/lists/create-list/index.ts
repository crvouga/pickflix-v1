import {Router} from 'express';
import {authenticated} from '../../../middlewares/authenticated';

export default (router: Router) =>
  router.post('/lists', authenticated, async (req, res) => {
    const {ListLogic, currentUser} = req;
    const {title, description} = req.body;

    try {
      const list = await ListLogic.createList({
        title,
        description,
        userIds: [currentUser.id],
      });

      res.status(201).json({...list, itemCount: 0});
    } catch (error) {
      res.status(400).json({errors: JSON.parse(error.message)});
    }
  });
