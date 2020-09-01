const Id = require("../../id");
const buildMakeUser = require("./user");
const makeUser = buildMakeUser({ Id });

module.exports = {
  makeUser,
};
