import { combineReducers, Reducer } from "@reduxjs/toolkit";
import { discoverActiveTags } from "../../discover/redux/discover-active-tags";
import { discoverTags } from "../../discover/redux/discover-tags";
import { pageHistory } from "../../home/page-history/page-history";
import { createListWithListItemsForm } from "../../list/forms/create-list-with-list-items-form/create-list-with-list-items-form";

import { editListForm } from "../../list/forms/edit-list-form/edit-list-form";
import { removeListItemsForm } from "../../list/forms/remove-list-items-form/remove-list-items-form";
import { toggleForm } from "../../list/forms/toggle-form/toggle-list-item-form";
import { video } from "../../media/video/redux/video";
import { moviePageUi } from "../../movie/redux/movie-page-ui";
import { personPageUi } from "../../person/redux/person-page-ui";
import { deleteReviewForm } from "../../review/form/delete-review/delete-review-form";
import { reviewForm } from "../../review/form/edit-create-review/review-form";
import { reviewVoteStates } from "../../review/form/vote/review-vote-states";
import { search } from "../../search/redux/search";
import { editUserForm } from "../../user/forms/edit-user-form/edit-user-form";
import { userPageUi } from "../../user/redux/user-page-ui";
import { modal } from "../modals/redux/modal";
import { snackbar } from "../snackbar/redux/snackbar";
import { AppState } from "./types";

const reducers: { [key in keyof AppState]: Reducer } = {
  reviewVoteStates: reviewVoteStates.reducer,
  userPageUi: userPageUi.reducer,
  modal: modal.reducer,
  editUserForm: editUserForm.reducer,
  createListWithListItemsForm: createListWithListItemsForm.reducer,
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
  toggleForm: toggleForm.reducer,
  video: video.reducer,
};

export const rootReducer = combineReducers(reducers);
