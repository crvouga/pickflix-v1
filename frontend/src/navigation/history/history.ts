import {
  createAction,
  createReducer,
  createSelector,
  PayloadAction,
} from "@reduxjs/toolkit";
import { dropRepeatsWith } from "ramda";
import { AppState } from "../../redux/types";

const name = "history";

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

export type HistoryState = {
  entities: Entity[];
};

const initialState: HistoryState = {
  entities: [],
};

/* 

*/

const actions = {
  push: createAction<Entity>(name + "/push"),
  clear: createAction(name + "/clear"),
};

/* 

*/

const slice = (state: AppState) => state.history;
const entities = createSelector([slice], (slice) => slice.entities);
const selectors = {
  entities,
};

/* 

*/

const reducer = createReducer(initialState, {
  [actions.push.toString()]: (state, action: PayloadAction<Entity>) => {
    state.entities.push(action.payload);
    state.entities = dropRepeatsWith(entityEquals, state.entities);
  },
  [actions.clear.toString()]: (state, action) => {
    state.entities = [];
  },
});

/* 

*/

export const history = {
  actions,
  selectors,
  reducer,
};
