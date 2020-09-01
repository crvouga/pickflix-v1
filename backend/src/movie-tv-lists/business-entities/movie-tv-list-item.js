const onlyNumbersRegex = /^[0-9]*$/;

module.exports = ({ Id }) => (itemInfo = {}) => {
  const id = String(itemInfo.id || Id.makeId());
  const tmdbMediaId = String(itemInfo.tmdbMediaId || "").trim();
  const tmdbMediaType = String(itemInfo.tmdbMediaType || "")
    .toLowerCase()
    .trim();

  if (!id) {
    throw new Error("id is required");
  }

  if (!Id.isValidId(id)) {
    throw new Error("invalid id");
  }

  if (tmdbMediaId.length === 0) {
    throw new Error("tmdb media id is required");
  }

  // pretty sure this holds for all tmdb ids
  if (!onlyNumbersRegex.test(tmdbMediaId)) {
    throw new Error("invalid tmdb media id");
  }

  if (tmdbMediaType.length === 0) {
    throw new Error("tmdb media type required");
  }

  if (!["movie", "tv"].includes(tmdbMediaType)) {
    throw new Error("invalid tmdb media type");
  }

  return Object.freeze({
    id,
    foreign: {
      tmdbMediaId,
      tmdbMediaType,
    },
  });
};
