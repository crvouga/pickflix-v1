const { makeDb } = require("../../infrastructure/postgres/makeDb");
const { buildUserDb } = require("./user-db");
const userDb = buildUserDb({ makeDb });
module.exports = {
  userDb,
};
