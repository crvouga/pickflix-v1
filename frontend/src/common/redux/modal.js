import { createAction, createReducer } from "@reduxjs/toolkit";
import * as R from "ramda";
import router from "./router";
import { takeEvery, put } from "redux-saga/effects";

const createPayload = (name, props) => ({
  payload: { name, props },
});

const actions = {
  open: createAction("[modal] open", createPayload),
  close: createAction("[modal] close", createPayload),
};

const initialState = {};

const reducer = createReducer(initialState, {});

const selectors = {
  isOpen: R.curry((name, state) =>
    R.pathOr(false, ["router", "location", "state", name, "isOpen"], state)
  ),
  props: R.curry((name, state) =>
    R.pathOr({}, ["router", "location", "state", name, "props"], state)
  ),
};

function* saga() {
  yield takeEvery(actions.open, function* (action) {
    const { name, props } = action.payload;
    yield put(
      router.actions.push({ state: { [name]: { isOpen: true, props } } })
    );
  });

  yield takeEvery(actions.close, function* (action) {
    const { name, props } = action.payload;
    yield put(
      router.actions.push({ state: { [name]: { isOpen: false, props } } })
    );
  });
}

export default {
  reducer,
  actions,
  selectors,
  saga,
};
