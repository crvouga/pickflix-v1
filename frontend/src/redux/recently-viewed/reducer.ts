import { createReducer } from "@reduxjs/toolkit";
import * as actions from "./actions";
import { RecentlyViewedState } from "./types";

const maxCapcity = 100;

const initialState: RecentlyViewedState = {
  entities: [],
};

export default createReducer(initialState, {
  [actions.clear.toString()]: (state) => {
    state.entities = [];
  },

  [actions.viewed.toString()]: (state, action) => {
    const entity = action.payload;
    state.entities = [entity, ...state.entities].slice(0, maxCapcity);
  },
});
