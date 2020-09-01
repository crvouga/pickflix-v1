const { makeId } = require("../../id");
const { makeMovieTvEntity } = require("../business-entities");

module.exports.makeMovieTvEntity = (overrides) => {
  return makeMovieTvEntity({
    id: makeId(),
    foreignIds: {
      tmdbId: 550, // fight club
      tmdbMediaType: "movie",
      ...overrides.foreignIds,
    },
    ...overrides,
  });
};
