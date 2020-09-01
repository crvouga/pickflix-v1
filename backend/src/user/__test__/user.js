const { makeId } = require("../../id");
const { makeUser } = require("../business-entities");

module.exports = (overrides) => {
  return makeUser({
    id: makeId(),
    foreignIds: {
      firebaseId: Math.random() + "",
    },
    ...overrides,
  });
};
