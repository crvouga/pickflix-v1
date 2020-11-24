import { combineReducers, Reducer } from "@reduxjs/toolkit";
import { discoverActiveTags } from "../../discover/redux/discover-active-tags";
import { discoverTags } from "../../discover/redux/discover-tags";
import { pageHistory } from "../../home/page-history/page-history";
import { createListWithListItemsForm } from "../../list/forms/create-list-with-list-items-form/create-list-with-list-items-form";
import { deleteListForm } from "../../list/forms/delete-list-form/delete-list-form";
import { editListForm } from "../../list/forms/edit-list-form/edit-list-form";
import { removeListItemsForm } from "../../list/forms/remove-list-items-form/remove-list-items-form";
import { toggleListItemForm } from "../../list/forms/toggle-list-item-form/toggle-list-item-form";
import { video } from "../../media/video/redux/video";
import { moviePageUi } from "../../movie/redux/movie-page-ui";
import { personPageUi } from "../../person/redux/person-page-ui";
import { deleteReviewForm } from "../../review/form/delete-review/delete-review-form";
import { reviewForm } from "../../review/form/review-form/review-form";
import { search } from "../../search/redux/search";
import { editUserForm } from "../../user/forms/edit-user-form/edit-user-form";
import { snackbar } from "../snackbar/redux/snackbar";
import { modal } from "../modals/redux/modal";
import { AppState } from "./types";

const reducers: { [key in keyof AppState]: Reducer } = {
  modal: modal.reducer,
  editUserForm: editUserForm.reducer,
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
