import {
  createAction,
  createReducer,
  createSelector,
  PayloadAction,
} from "@reduxjs/toolkit";
import { uniqWith } from "ramda";
import { AppState } from "../../app/redux/types";

const name = "page-history";

/* 

*/

export type Entity =
  | {
      id: string;
      mediaType: "movie";
      posterPath: string;
      title: string;
    }
  | {
      id: string;
      mediaType: "person";
      profilePath: string;
      name: string;
    };

const entityEquals = (entity1: Entity, entity2: Entity) =>
  entity1.id === entity2.id && entity1.mediaType === entity2.mediaType;

export type PageHistoryState = {
  entities: Entity[];
};

const initialState: PageHistoryState = {
  entities: [],
};

/* 

*/

const actions = {
  push: createAction<Entity>(name + "/PUSH"),
  clear: createAction(name + "/CLEAR"),
};

/* 

*/

const slice = (state: AppState) => state.pageHistory;
const selectors = {
  slice,
  entities: createSelector([slice], (slice) => slice.entities),
  movies: createSelector([slice], (slice) =>
    slice.entities.filter((_) => _.mediaType === "movie")
  ),
};

/* 

*/

const reducer = createReducer(initialState, {
  [actions.push.toString()]: (state, action: PayloadAction<Entity>) => {
    state.entities.unshift(action.payload);
    state.entities = uniqWith(entityEquals, state.entities);
  },
  [actions.clear.toString()]: (state, action) => {
    state.entities = [];
  },
});

/* 

*/

export const pageHistory = {
  actions,
  selectors,
  reducer,
};
