module.exports = ({ userDb }) => async ({ foreignIds = {} }) => {
  const { firebaseId } = foreignIds;

  if (!firebaseId) {
    throw new Error("firebase id required");
  }

  const found = await userDb.findByForeignIds({ foreignIds: { firebaseId } });

  return found;
};
