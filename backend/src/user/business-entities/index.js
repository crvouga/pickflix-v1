const Id = require("../../id");
const buildMakeUser = require("./make-user");
const makeUser = buildMakeUser({ Id });
module.exports = {
  makeUser,
};
