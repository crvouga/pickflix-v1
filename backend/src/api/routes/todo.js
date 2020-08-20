const express = require("express");
const authenicate = require("../middlewares/authenicate");
const TodoService = require("../../business/todo");
const { celebrate, Joi } = require("celebrate");

const router = express.Router();

const todoIdSchema = {
  id: Joi.number().required(),
};

const todoSchema = {
  task: Joi.string().max(255).required(),
};

router.get("/", authenicate, async (req, res, next) => {
  try {
    const appUserId = req.appUser.id;
    const results = await TodoService.get({ appUserId });
    res.json({ results });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  celebrate({ body: todoSchema }),
  authenicate,
  async (req, res, next) => {
    try {
      const appUserId = req.appUser.id;
      const todoData = req.body;
      const todo = await TodoService.create({ appUserId, todoData });
      res.json(todo);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  celebrate({ params: todoIdSchema }),
  authenicate,
  async (req, res, next) => {
    try {
      const id = req.params.id;
      await TodoService.delete({ id });
      res.status(200).end();
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/:id",
  celebrate({ params: todoIdSchema, body: todoSchema }),
  authenicate,
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const todoData = req.body;
      const todo = await TodoService.update({ id, todoData });
      res.json(todo);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
