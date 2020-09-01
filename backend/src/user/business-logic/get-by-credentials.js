module.exports.buildGetByCredentials = ({ userDb }) => async ({
  credentials,
}) => {
  const { firebaseId } = credentials || {};

  if (!firebaseId) {
    throw new Error("missing credentials");
  }

  const user = await userDb.findByCredentials({ credentials: { firebaseId } });
  return user;
};
