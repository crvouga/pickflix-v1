const { makeMovieTvList } = require("../../business-entities");
module.exports = ({ movieTvListDb }) => async (movieTvListInfo) => {
  const movieTvList = makeMovieTvList(movieTvListInfo);
  await movieTvListDb.insert(movieTvList);
  return movieTvList;
};
