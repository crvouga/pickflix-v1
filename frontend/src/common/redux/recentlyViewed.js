import { createAction, createReducer } from "@reduxjs/toolkit";
import * as R from "ramda";

const maxCapcity = 100;

const keysByMediaType = {
  movie: ["posterPath", "id", "title"],
  person: ["profilePath", "id", "name"],
};

const createPayload = (mediaType, data) => {
  return {
    payload: {
      mediaType,
      data,
    },
  };
};

const actions = {
  viewed: createAction("recentlyViewed/viewed", createPayload),
  clear: createAction("recentlyViewed/clear"),
};

const reducer = createReducer(
  {
    entities: [],
  },
  {
    [actions.viewed]: (state, action) => {
      const { mediaType, data } = action.payload;

      const entity = R.pipe(
        R.pick(R.prop(mediaType, keysByMediaType)),
        R.assoc("mediaType", mediaType)
      )(data);

      state.entities = R.pipe(
        R.prepend(entity),
        R.uniqBy(R.prop("id")),
        R.take(maxCapcity)
      )(state.entities);
    },

    [actions.clear]: (state) => {
      state.entities = [];
    },
  }
);

const selectors = {
  entities: (state) => state.recentlyViewed.entities || [],
};

function* saga() {}

export default {
  reducer,
  actions,
  selectors,
  saga,
};
