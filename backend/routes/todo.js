const express = require("express");
const router = express.Router();
const uuid = require("uuid").v4;
const db = require("../db");

const makeTodo = (description) => ({
  id: uuid(),
  status: "progress",
  description,
});

const initialTodos = [
  makeTodo("get database working"),
  makeTodo("make desktop version"),
  makeTodo("pull more videos from youtube"),
];

router.get("/", (req, res) => {
  console.log("GET");
  res.json({
    todos: initialTodos,
  });
});

router.post("/", (req, res) => {
  console.log("POST", req.body);
});

router.delete("/:todoId", (req, res) => {
  console.log("DELETE");
});

module.exports = router;
