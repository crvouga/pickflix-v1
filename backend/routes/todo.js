const express = require("express");
const router = express.Router();
const authenicateAppUser = require("../middlewares/authenicateAppUser");
const Todo = require("../db/Todo");

router.get("/", authenicateAppUser, async (req, res) => {
  try {
    const results = await Todo.getAll({ appUserId: req.appUser.id });
    console.log({ results });
    res.json({ results });
  } catch (error) {
    res.status(500);
    res.json(error);
  }
});

router.post("/", authenicateAppUser, async (req, res) => {
  try {
    const todoData = {
      appUserId: req.appUser.id,
      task: req.body.task,
    };
    const todo = await Todo.create(todoData);
    res.json(todo);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json(error);
  }
});

router.delete("/:id", authenicateAppUser, async (req, res) => {
  try {
    await Todo.delete({ id: req.params.id });
    res.status(200).end();
  } catch (error) {
    res.status(500).json({ status: "error", error });
  }
});

module.exports = router;
