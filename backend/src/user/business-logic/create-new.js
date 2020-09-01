const { makeUser } = require("../business-entities");

module.exports = ({ getByForeignIds, userDb }) => async ({ foreignIds }) => {
  const got = await getByForeignIds({ foreignIds });

  if (got) {
    throw new Error("foreign ids already being used");
  }

  const newUser = makeUser({ foreignIds });

  const inserted = await userDb.insert(newUser);

  return inserted;
};
