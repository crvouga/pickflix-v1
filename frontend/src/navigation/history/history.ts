import { createAction, createReducer } from "@reduxjs/toolkit";
import { AppState } from "../../redux/types";

const name = "history";

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

export type HistoryState = {
  entities: Entity[];
};

const initialState: HistoryState = {
  entities: [],
};

const actions = {
  push: createAction<Entity>(name + "/push"),
  clear: createAction(name + "/clear"),
};

const selectors = {
  entities: (state: AppState) => state.history.entities,
};

const reducer = createReducer(initialState, {
  [actions.push.toString()]: (state, action) => {
    state.entities.push(action.payload);
  },
  [actions.clear.toString()]: (state, action) => {
    state.entities = [];
  },
});

export const history = {
  actions,
  selectors,
  reducer,
};
