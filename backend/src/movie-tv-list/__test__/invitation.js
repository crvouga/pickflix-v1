const { makeId } = require("../../id");
const { makeInvitation } = require("../business-entities");

module.exports.makeInvitation = (overrides) => {
  return makeInvitation({
    id: makeId(),
    sendUserId: makeId(),
    receiverUserId: makeId(),
    movieTvListId: makeId(),
  });
};
