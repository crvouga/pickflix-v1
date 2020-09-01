const { userDb } = require("../data-access");
const { buildGetByCredentials } = require("./get-by-credentials");
const { buildCreateNew } = require("./create-new");
const {
  buildGetByCredentialsElseCreateNew,
} = require("./get-by-credentials-else-create-new");

const getByCredentials = buildGetByCredentials({ userDb });
const createNew = buildCreateNew({ userDb, getByCredentials });
const getByCredentialsElseCreateNew = buildGetByCredentialsElseCreateNew({
  getByCredentials,
  createNew,
});
module.exports = {
  getByCredentialsElseCreateNew,
  createNew,
  getByCredentials,
};
