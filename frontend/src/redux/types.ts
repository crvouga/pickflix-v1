import { AuthFormState } from "../auth/auth-form/redux/types";
import { AuthState } from "../auth/redux/types";
import { DiscoverMovieState } from "../discover/redux/discover-movie";
import { DiscoverMovieUiState } from "../discover/redux/discover-movie-ui";
import { AddListItemsFormState } from "../lists/redux/add-list-items-form";
import { HistoryState } from "../navigation/history/history";
import { PersonPageUiState } from "../person/redux/person-page-ui";
import { SearchState } from "../search/redux/search";
import { SnackbarState } from "../snackbar/redux/snackbar";
import { VideoState } from "../video/redux/video";

export type AppState = {
  addListItemsForm: AddListItemsFormState;
  video: VideoState;
  history: HistoryState;
  auth: AuthState;
  authForm: AuthFormState;
  snackbar: SnackbarState;
  search: SearchState;
  discoverMovie: DiscoverMovieState;
  discoverMovieUi: DiscoverMovieUiState;
  personPageUi: PersonPageUiState;
};
