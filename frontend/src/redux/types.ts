import { AuthState } from "../auth/redux/types";
import { SignInFormState } from "../auth/signInForm/redux/types";
import { DiscoverState } from "../discover/redux/types";
import { AddListItemsFormState } from "../lists/redux/add-list-items-form";
import { PersonPageState } from "../person/redux/types";
import { SearchState } from "../search/redux/types";
import { SnackbarState } from "../snackbar/redux/snackbar";
import { VideoState } from "../video/redux/types";
import { RecentlyViewedState } from "./recently-viewed/types";
import { RouterState } from "./router/types";
import {
  TypedUseSelectorHook,
  useSelector as useSelectorRedux,
  useDispatch as useDispatchRedux,
} from "react-redux";

export type AppState = {
  addListItemsForm: AddListItemsFormState;
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

export const useSelector: TypedUseSelectorHook<AppState> = useSelectorRedux;
export const useDispatch = useDispatchRedux;
