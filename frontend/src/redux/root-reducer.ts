import { combineReducers, Reducer } from "@reduxjs/toolkit";
import { discoverActiveTags } from "../discover/redux/discover-active-tags";
import { discoverTags } from "../discover/redux/discover-tags";
import { pageHistory } from "../home/page-history/page-history";
import { addListForm } from "../lists/redux/add-list-form";
import { addListItemForm } from "../lists/redux/add-list-item-form";
import { editListForm } from "../lists/redux/edit-list-form";
import { moviePageUi } from "../movie/redux/movie-page-ui";
import { personPageUi } from "../person/redux/person-page-ui";
import { reviewForm } from "../reviews/redux/review-form";
import { search } from "../search/redux/search";
import { snackbar } from "../snackbar/redux/snackbar";
import { video } from "../video/redux/video";
import { AppState } from "./types";

const reducers: { [key in keyof AppState]: Reducer } = {
  reviewForm: reviewForm.reducer,
  editListForm: editListForm.reducer,
  addListForm: addListForm.reducer,
  addListItemForm: addListItemForm.reducer,
  discoverTags: discoverTags.reducer,
  discoverActiveTags: discoverActiveTags.reducer,
  pageHistory: pageHistory.reducer,
  personPageUi: personPageUi.reducer,
  moviePageUi: moviePageUi.reducer,
  search: search.reducer,
  snackbar: snackbar.reducer,
  video: video.reducer,
};

export const rootReducer = combineReducers(reducers);
