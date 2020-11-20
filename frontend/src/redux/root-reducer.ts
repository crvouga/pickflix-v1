import { combineReducers, Reducer } from "@reduxjs/toolkit";
import { discoverActiveTags } from "../discover/redux/discover-active-tags";
import { discoverTags } from "../discover/redux/discover-tags";
import { pageHistory } from "../home/page-history/page-history";
import { createListWithListItemsForm } from "../lists/forms/create-list-with-list-items-form/create-list-with-list-items-form";
import { deleteListForm } from "../lists/forms/delete-list-form/delete-list-form";
import { editListForm } from "../lists/forms/edit-list-form/edit-list-form";
import { removeListItemsForm } from "../lists/forms/remove-list-items-form/remove-list-items-form";
import { toggleListItemForm } from "../lists/forms/toggle-list-item-form/toggle-list-item-form";
import { moviePageUi } from "../movie/redux/movie-page-ui";
import { personPageUi } from "../person/redux/person-page-ui";
import { deleteReviewForm } from "../reviews/form/delete-review/delete-review-form";
import { reviewForm } from "../reviews/form/review-form/review-form";
import { search } from "../search/redux/search";
import { snackbar } from "../snackbar/redux/snackbar";
import { video } from "../video/redux/video";
import { AppState } from "./types";

const reducers: { [key in keyof AppState]: Reducer } = {
  createListWithListItemsForm: createListWithListItemsForm.reducer,
  deleteListForm: deleteListForm.reducer,
  deleteReviewForm: deleteReviewForm.reducer,
  discoverActiveTags: discoverActiveTags.reducer,
  discoverTags: discoverTags.reducer,
  editListForm: editListForm.reducer,
  moviePageUi: moviePageUi.reducer,
  pageHistory: pageHistory.reducer,
  personPageUi: personPageUi.reducer,
  removeListItemsForm: removeListItemsForm.reducer,
  reviewForm: reviewForm.reducer,
  search: search.reducer,
  snackbar: snackbar.reducer,
  toggleListItemForm: toggleListItemForm.reducer,
  video: video.reducer,
};

export const rootReducer = combineReducers(reducers);
