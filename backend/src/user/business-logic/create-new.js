const { makeUser } = require("../business-entities");

module.exports.buildCreateNew = ({ getByCredentials, userDb }) => async ({
  credentials,
}) => {
  const exists = await getByCredentials({ credentials });

  if (exists) {
    throw new Error("credentials already being used");
  }

  const newUser = makeUser({ credentials });

  const inserted = await userDb.insert(newUser);

  return inserted;
};
