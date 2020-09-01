const { makeMovieTvList } = require("../../business-entities");
module.exports = ({ movieTvListDb }) => async (movieTvListInfo) => {
  const { userId } = movieTvListInfo;
  const movieTvList = makeMovieTvList({
    ...movieTvListInfo,
    userIds: [userId],
  });
  await movieTvListDb.insert(movieTvList);
  return movieTvList;
};
