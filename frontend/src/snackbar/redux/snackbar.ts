import { createAction, createReducer } from "@reduxjs/toolkit";

const name = "snackbar";

/*

*/

type SnackbarProps = {
  message: string;
  action?: React.ReactNode;
};

export type SnackbarState = {
  props: SnackbarProps;
  open: boolean;
};

/*

*/

const initialState: SnackbarState = {
  props: {
    message: "",
    action: null,
  },
  open: false,
};

/*

*/

const actions = {
  setOpen: createAction<boolean>("[snackbar] SET_OPEN"),
  setProps: createAction<SnackbarProps>("[snackbar] SET_PROPS"),
  display: createAction<SnackbarProps>("[snackbar] DISPLAY"),
};

/*

*/

const reducer = createReducer(initialState, {
  [actions.setOpen.toString()]: (state, action) => {
    state.open = action.payload;
  },
  [actions.setProps.toString()]: (state, action) => {
    state.props = action.payload;
  },
});

/*

*/

const selectors = {
  open: (state: { [name]: SnackbarState }) => state[name].open || false,
  props: (state: { [name]: SnackbarState }) => state[name].props || {},
};

/* 

*/
export const snackbar = {
  actions,
  selectors,
  reducer,
};
