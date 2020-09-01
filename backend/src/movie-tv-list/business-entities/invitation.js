module.exports = ({ Id }) => (invitationInfo) => {
  const {
    id = Id.makeId(),
    senderUserId,
    receiverUserId,
    movieTvListId,
  } = invitationInfo;

  if (!Id.isValidId(id)) {
    throw new Error("invalid id");
  }

  if (!Id.isValidId(senderUserId)) {
    throw new Error("invalid sender user id");
  }

  if (!Id.isValidId(receiverUserId)) {
    throw new Error("invalid receiver user id");
  }

  if (!Id.isValidId(movieTvListId)) {
    throw new Error("invalid list id");
  }

  return Object.freeze({
    id,
    senderUserId,
    receiverUserId,
    movieTvListId,
  });
};
