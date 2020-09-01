module.exports = ({ Id }) => (userInfo) => {
  const { id = Id.makeId(), credentials } = userInfo || {};

  if (!credentials) {
    throw new Error("need credentials to make a user");
  }

  const { firebaseId } = credentials;

  if (!firebaseId) {
    throw new Error("need firebase id credential");
  }

  if (!Id.isValidId(id)) {
    throw new Error("invalid id");
  }

  // there is better validation for
  if (typeof firebaseId !== "string") {
    throw new Error("invalid firebase id");
  }

  const user = {
    id,
    credentials: {
      firebaseId,
    },
  };

  return user;
};
