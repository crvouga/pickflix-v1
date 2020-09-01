const { makeId } = require("../../id");
const { makeMovieTvListItem } = require("../business-entities");

module.exports.makeMovieTvListItem = (overrides) => {
  return makeMovieTvListItem({
    id: makeId(),
    tmdbMediaId: 550, // fight club
    tmdbMediaType: "movie",
    ...overrides,
  });
};
