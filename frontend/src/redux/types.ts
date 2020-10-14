import {
  TypedUseSelectorHook,
  useDispatch as useDispatchRedux,
  useSelector as useSelectorRedux,
} from "react-redux";
import { AuthState } from "../auth/redux/types";
import { SignInFormState } from "../auth/signInForm/redux/types";
import { DiscoverMovieState } from "../discover/redux/discover-movie";
import { DiscoverMovieUiState } from "../discover/redux/discover-movie-ui";
import { AddListItemsFormState } from "../lists/redux/add-list-items-form";
import { PersonPageState } from "../person/redux/types";
import { SearchState } from "../search/redux/search";
import { SnackbarState } from "../snackbar/redux/snackbar";
import { VideoState } from "../video/redux/types";
import { RecentlyViewedState } from "./recently-viewed/types";
import { RouterState } from "./router/types";

export type AppState = {
  addListItemsForm: AddListItemsFormState;
  router: RouterState;
  video: VideoState;
  recentlyViewed: RecentlyViewedState;
  auth: AuthState;
  signInForm: SignInFormState;
  snackbar: SnackbarState;
  personPage: PersonPageState;
  search: SearchState;
  discoverMovie: DiscoverMovieState;
  discoverMovieUi: DiscoverMovieUiState;
};

export const useSelector: TypedUseSelectorHook<AppState> = useSelectorRedux;
export const useDispatch = useDispatchRedux;
