const { makeId } = require("../../src/id");
const { makeUser } = require("../../src/user/business-entities");

const makeFakeUser = () => {
  return makeUser({
    id: makeId(),
    credentials: {
      firebaseId: makeId(),
    },
  });
};

module.exports = { makeFakeUser };
