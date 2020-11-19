import {
  bindActionCreators,
  createAction,
  createReducer,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/types";
import { createPayloadReducer } from "../../redux/utils";
import { SearchResult } from "../query";
import { uniqBy } from "ramda";

const name: "search" = "search";

export enum SearchFilter {
  // multi = "multi",
  movie = "movie",
  person = "person",
  user = "user",
}
export const toSearchFilterName = (filter: SearchFilter) => {
  return {
    [SearchFilter.movie]: "Movies",
    [SearchFilter.person]: "People",
    [SearchFilter.user]: "Users",
  }[filter];
};
export type SearchState = {
  history: SearchResult[];
  filter?: SearchFilter;
  text: string;
};

/* 

*/

export const initialState: SearchState = {
  history: [],
  text: "",
};

/* 

*/

const slice = (state: AppState) => state.search;

export const selectors = {
  slice,
};

/* 

*/

const actions = {
  setText: createAction<string>(`${name}/SET_TEXT`),
  setHistory: createAction<SearchResult[]>(`${name}/SET_HISTORY`),
  setFilter: createAction<SearchFilter | undefined>(`${name}/SET_FILTER`),
};

/* 

*/

const reducer = createReducer(initialState, {
  [actions.setFilter.toString()]: createPayloadReducer("filter"),
  [actions.setText.toString()]: createPayloadReducer("text"),
  [actions.setHistory.toString()]: (state, action) => {
    state.history = uniqBy((result) => result.id, action.payload);
  },
});

/* 


*/

export const search = {
  actions,
  reducer,
  selectors,
};

/* 

*/

export const useSearchState = () => {
  const dispatch = useDispatch();
  const actions = bindActionCreators(search.actions, dispatch);
  const slice = useSelector(search.selectors.slice);
  const { history, filter } = slice;
  const { setHistory, setFilter } = actions;
  const pushHistory = (result: SearchResult) => {
    setHistory([result, ...history]);
  };
  const removeHistory = ({ id }: SearchResult) => {
    setHistory(
      uniqBy(
        (result) => result.id,
        history.filter((result) => result.id !== id)
      )
    );
  };
  const toggleFilter = (selectedFilter: SearchFilter) => {
    if (filter === selectedFilter) {
      setFilter(undefined);
    } else {
      setFilter(selectedFilter);
    }
  };
  return {
    ...actions,
    ...slice,
    pushHistory,
    removeHistory,
    toggleFilter,
  };
};
