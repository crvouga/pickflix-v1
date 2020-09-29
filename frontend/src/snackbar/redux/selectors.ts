import { AppState } from "../../redux/types";

export const snackbar = (state: AppState) => state.snackbar || {};
export const open = (state: AppState) => snackbar(state).open;
export const snackbarProps = (state: AppState) => snackbar(state).snackbarProps;
