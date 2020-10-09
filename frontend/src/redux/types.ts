import { AuthState, initialState as auth } from "../auth/redux/types";
import {
  SignInFormState,
  initialState as signInForm,
} from "../auth/signInForm/redux/types";
import {
  DiscoverState,
  initialState as discover,
} from "../discover/redux/types";
import { ListsState, initialState as lists } from "../lists/redux/types";
import { SearchState, initialState as search } from "../search/redux/types";
import {
  SnackbarState,
  initialState as snackbar,
} from "../snackbar/redux/reducer";
import { VideoState, initialState as video } from "../video/redux/types";
import {
  RecentlyViewedState,
  initialState as recentlyViewed,
} from "./recently-viewed/types";
import { RouterState, initialState as router } from "./router/types";
import {
  PersonPageState,
  initialState as personPage,
} from "../person/redux/types";

export type AppState = {
  lists: ListsState;
  router: RouterState;
  video: VideoState;
  discover: DiscoverState;
  search: SearchState;
  recentlyViewed: RecentlyViewedState;
  auth: AuthState;
  signInForm: SignInFormState;
  snackbar: SnackbarState;
  personPage: PersonPageState;
};

export const initialState = {
  lists,
  router,
  video,
  discover,
  search,
  recentlyViewed,
  auth,
  signInForm,
  snackbar,
  personPage,
};
