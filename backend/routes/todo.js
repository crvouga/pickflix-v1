const express = require("express");
const router = express.Router();
const uuid = require("uuid").v4;
const db = require("../db");
const authenicateToken = require("../middlewares/authenicateToken");

const makeTodo = (description) => ({
  id: uuid(),
  status: "progress",
  description,
});

router.get("/", authenicateToken, async (req, res) => {
  const userId = req.user.uid;
  // const todos = await db.query(`SELECT * FROM todos WHERE userId=${userId}`);
  res.json({
    todos: [],
  });
});

router.post("/", authenicateToken, (req, res) => {
  console.log("POST", req.body);
});

router.delete("/:todoId", authenicateToken, (req, res) => {
  console.log("DELETE");
});

module.exports = router;
