import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import { AuthState } from "../auth/redux/types";
import { SignInFormState } from "../auth/signInForm/redux/types";
import { DiscoverState } from "../discover/redux/types";
import { ListsState } from "../lists/redux/types";
import { SearchState } from "../search/redux/types";
import { SnackbarState } from "../snackbar/redux/types";
import { VideoState } from "../video/redux/types";
import { QueryState } from "./query/types";
import { RecentlyViewedState } from "./recently-viewed/types";
import { RouterState } from "./router/types";
import { TmdbState } from "../tmdb/redux/types";
import { BooleanState } from "./boolean/types";
import { PersonPageState } from "../person/redux/types";

export interface AppState {
  lists: ListsState;
  router: RouterState;
  query: QueryState;
  video: VideoState;
  discover: DiscoverState;
  search: SearchState;
  recentlyViewed: RecentlyViewedState;
  auth: AuthState;
  signInForm: SignInFormState;
  snackbar: SnackbarState;
  tmdb: TmdbState;
  boolean: BooleanState;
  personPage: PersonPageState;
}
