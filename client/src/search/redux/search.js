import { createAction, createReducer } from "@reduxjs/toolkit";
import * as R from "ramda";

const selectors = {
  results: (state) => state.search.results,
  text: (state) => state.search.text,
};

const actions = {
  setResults: createAction("search/setResults"),
  setText: createAction("search/setText"),
  pushHistory: createAction("search/pushHistory"),
};

const initialState = {
  results: [],
  text: "",
  page: 1,
  history: [],
};

const reducer = createReducer(initialState, {
  [actions.setResults]: (state, { payload: newResults }) => {
    if (newResults && newResults.length > 0) {
      state.results = newResults;
    }
  },
  [actions.setText]: (state, { payload: newText }) => {
    state.text = newText.trim();
  },
  [actions.pushHistory]: (state, { payload: result }) => {
    state.history = R.uniq(R.prepend(result, state.history));
  },
});

export default {
  reducer,
  actions,
  selectors,
};
