const { makeId } = require("../../id");
const { makeMediaList } = require("../business-entities");

module.exports.makeFakeMediaList = (overrides) => {
  return makeMediaList({
    id: makeId(),
    userIds: [makeId()],
    itemIds: [makeId(), makeId(), makeId()],
    title: "fav 🎥🍿",
    description: "a list of my favorite movies",
    ...overrides,
  });
};
