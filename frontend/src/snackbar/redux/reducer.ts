import { createReducer } from "@reduxjs/toolkit";
import * as actions from "./actions";
import { SnackbarState } from "./types";

const initialState: SnackbarState = {
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
