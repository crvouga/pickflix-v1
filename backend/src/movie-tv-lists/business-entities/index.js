const Id = require("../../id");
const buildMakeMovieTvList = require("./movie-tv-list");
const buildMakeMovieTvListItem = require("./movie-tv-list-item");

const makeMovieTvListItem = buildMakeMovieTvListItem({ Id });
const makeMovieTvList = buildMakeMovieTvList({ Id });

module.exports = { makeMovieTvList, makeMovieTvListItem };
