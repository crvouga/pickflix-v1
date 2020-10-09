import { createReducer } from "@reduxjs/toolkit";
import * as actions from "./actions";
import { SnackbarProps } from "@material-ui/core";

export type SnackbarState = {
  snackbarProps: Partial<SnackbarProps>;
  open: boolean;
};

export const initialState: SnackbarState = {
  snackbarProps: {},
  open: false,
};

export default createReducer(initialState, {
  [actions.setOpen.toString()]: (state, action) => {
    state.open = action.payload;
  },
  [actions.setSnackbarProps.toString()]: (state, action) => {
    state.snackbarProps = action.payload;
  },
});
