import { createAction, createReducer } from "@reduxjs/toolkit";
import { delay, put, select, takeLatest } from "redux-saga/effects";

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

const SNACKBAR_TIMEOUT = 4000;

export function* saga() {
  yield put(actions.setOpen(false));
  yield takeLatest(actions.display, function* (action) {
    console.log("HELLO");
    const props = action.payload;
    if (yield select(selectors.open)) {
      yield put(actions.setOpen(false));
      yield delay(200);
    }
    yield put(actions.setProps(props));
    yield put(actions.setOpen(true));
    yield delay(SNACKBAR_TIMEOUT);
    yield put(actions.setOpen(false));
  });
}

/* 

*/
export const snackbar = {
  actions,
  selectors,
  reducer,
  saga,
};
