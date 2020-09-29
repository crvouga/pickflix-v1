import { take, uniqBy } from "ramda";
import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import * as actions from "./actions";
import { RecentlyViewedState, Entity } from "./types";

const maxCapcity = 100;

const initialState: RecentlyViewedState = {
  entities: [],
};

export default createReducer(initialState, {
  [actions.clear.toString()]: (state) => {
    state.entities = [];
  },

  [actions.viewed.toString()]: (state, action: PayloadAction<Entity>) => {
    const entity = action.payload;
    state.entities = uniqBy(
      (entity) => entity.id,
      take(maxCapcity, [entity, ...state.entities])
    );
  },
});
