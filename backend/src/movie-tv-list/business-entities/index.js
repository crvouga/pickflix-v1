const Id = require("../../id");

const buildMakeMovieTvList = require("./movie-tv-list");
const buildMakeMovieTvEntity = require("./movie-tv-entity");
const buildMakeInvitation = require("./invitation");

const makeMovieTvEntity = buildMakeMovieTvEntity({ Id });
const makeMovieTvList = buildMakeMovieTvList({ Id });
const makeInvitation = buildMakeInvitation({ Id });

module.exports = {
  makeMovieTvList,
  makeMovieTvEntity,
  makeInvitation,
};
