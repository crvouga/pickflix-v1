module.exports = ({ Id }) => (listInfo = {}) => {
  const {
    id = Id.makeId(),
    userIds = [],
    itemIds = [],
    title = "",
    description = "",
  } = listInfo;

  if (!Id.isValidId(id)) {
    throw new Error("invalid id");
  }

  if (userIds.length === 0) {
    throw new Error("list must have at least one user");
  }

  if (userIds.some((userId) => !Id.isValidId(userId))) {
    throw new Error("invalid user id");
  }

  if (itemIds.some((itemId) => !Id.isValidId(itemId))) {
    throw new Error("invalid item id");
  }

  if (title.length === 0) {
    throw new Error("title can not be empty");
  }

  if (title.length > 100) {
    throw new Error("title is too long");
  }

  if (description.length > 280) {
    throw new Error("description is too long");
  }

  return Object.freeze({
    id,
    userIds,
    itemIds,
    name,
    description,
  });
};
