import { call, put, select } from "redux-saga/effects";
import { getMovieGenres } from "../query";
import { IDiscoverTag, TagType } from "../query/types";
import { discoverTags } from "./discover-tags";

export const getMovieGenreTagsById = async () => {
  const genresResponse = await getMovieGenres();
  const movieGenreTagsById: {
    [id: string]: IDiscoverTag;
  } = genresResponse.genres.reduce(
    (byId, genre) => ({
      ...byId,
      [genre.id]: {
        type: TagType.withGenres,
        ...genre,
      },
    }),
    {}
  );
  return movieGenreTagsById;
};

export function* discoverMovieSaga() {
  const movieGenreTagsById: { [id: string]: IDiscoverTag } = yield call(
    getMovieGenreTagsById
  );
  const tagsById: { [id: string]: IDiscoverTag } = yield select(
    discoverTags.selectors.tagsById
  );
  yield put(
    discoverTags.actions.setTagsById({
      ...movieGenreTagsById,
      ...tagsById,
    })
  );
}
