const { makeId } = require("../../id");
const { makeUser } = require("../business-entities");

const makeFakeUser = () => {
  return makeUser({
    id: makeId(),
    credentials: {
      firebaseId: makeId(),
    },
  });
};

module.exports = { makeFakeUser };
