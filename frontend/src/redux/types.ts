import { AuthFormState } from "../auth/auth-form/redux/auth-form";
import { AuthState } from "../auth/redux/types";
import { DiscoverActiveTags } from "../discover/redux/discover-active-tags";
import { DiscoverTagsState } from "../discover/redux/discover-tags";
import { AddListFormState } from "../lists/redux/add-list-form";
import { AddListItemFormState } from "../lists/redux/add-list-item-form";
import { EditListFormState } from "../lists/redux/edit-list-form";
import { HistoryState } from "../navigation/history/history";
import { PersonPageUiState } from "../person/redux/person-page-ui";
import { SearchState } from "../search/redux/search";
import { SnackbarState } from "../snackbar/redux/snackbar";
import { VideoState } from "../video/redux/video";

export type AppState = {
  editListForm: EditListFormState;
  addListItemForm: AddListItemFormState;
  addListForm: AddListFormState;
  video: VideoState;
  history: HistoryState;
  auth: AuthState;
  authForm: AuthFormState;
  snackbar: SnackbarState;
  search: SearchState;
  personPageUi: PersonPageUiState;
  discoverActiveTags: DiscoverActiveTags;
  discoverTags: DiscoverTagsState;
};
