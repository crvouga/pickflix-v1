module.exports = ({ Id }) => (userInfo = {}) => {
  const { id = Id.makeId(), foreignIds = {} } = userInfo;

  if (!Id.isValidId(id)) {
    throw new Error("invalid id");
  }

  const { firebaseId } = foreignIds;

  if (!firebaseId) {
    throw new Error("foreign id 'firebaseId' is required");
  }

  // there is better validation for
  if (typeof firebaseId !== "string") {
    throw new Error("invalid firebase id");
  }

  return Object.freeze({
    id,
    foreignIds: {
      firebaseId,
    },
  });
};
