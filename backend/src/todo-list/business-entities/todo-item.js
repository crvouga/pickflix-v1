module.exports.buildMakeTodoItem = ({ makeId, isValidId }) => (todoInfo) => {
  let {
    id = makeId(),
    userId,
    text,
    completed = false,
    createdAt = new Date(),
    updatedAt = new Date(),
  } = todoInfo || {};

  if (!isValidId(id)) {
    throw new Error("invalid id");
  }

  if (!userId) {
    throw new Error("user id required");
  }

  if (!isValidId(userId)) {
    throw new Error("invalid user id");
  }

  if (typeof text !== "string") {
    throw new Error("text must be a string");
  }

  if (text.length < 1) {
    throw new Error("text can't be empty");
  }

  if (text.length > 200) {
    throw new Error("text is too long");
  }

  return Object.freeze({
    id,
    userId,
    text,
    completed,
    createdAt,
    updatedAt,
  });
};
