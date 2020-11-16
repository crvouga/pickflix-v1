import { combineReducers, Reducer } from "@reduxjs/toolkit";
import { discoverActiveTags } from "../discover/redux/discover-active-tags";
import { discoverTags } from "../discover/redux/discover-tags";
import { pageHistory } from "../home/page-history/page-history";
import { addListForm } from "../lists/lists-form/add-list-form";
import { addListItemForm } from "../lists/list-items-form/add-list-item-form";
import { editListForm } from "../lists/lists-form/edit-list-form";
import { moviePageUi } from "../movie/redux/movie-page-ui";
import { personPageUi } from "../person/redux/person-page-ui";
import { deleteReviewForm } from "../reviews/form/delete-review-form";
import { reviewForm } from "../reviews/form/review-form";
import { search } from "../search/redux/search";
import { snackbar } from "../snackbar/redux/snackbar";
import { video } from "../video/redux/video";
import { AppState } from "./types";

const reducers: { [key in keyof AppState]: Reducer } = {
  addListForm: addListForm.reducer,
  addListItemForm: addListItemForm.reducer,
  deleteReviewForm: deleteReviewForm.reducer,
  discoverActiveTags: discoverActiveTags.reducer,
  discoverTags: discoverTags.reducer,
  editListForm: editListForm.reducer,
  moviePageUi: moviePageUi.reducer,
  pageHistory: pageHistory.reducer,
  personPageUi: personPageUi.reducer,
  reviewForm: reviewForm.reducer,
  search: search.reducer,
  snackbar: snackbar.reducer,
  video: video.reducer,
};

export const rootReducer = combineReducers(reducers);
