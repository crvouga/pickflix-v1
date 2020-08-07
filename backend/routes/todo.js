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

const todos = [
  makeTodo("get database working"),
  makeTodo("make desktop version"),
  makeTodo("pull more videos from youtube"),
];

router.get("/", (req, res) => {
  res.json({
    todos,
  });
});

router.post("/", authenicateToken, (req, res) => {
  console.log("POST", req.body);
});

router.delete("/:todoId", authenicateToken, (req, res) => {
  console.log("DELETE");
});

module.exports = router;
