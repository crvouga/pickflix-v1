import { createAction, createReducer } from "@reduxjs/toolkit";
import * as R from "ramda";
import router from "./router";
import { takeEvery, put, select } from "redux-saga/effects";

const createPayload = (name, props = {}) => ({
  payload: { name, props },
});

const actions = {
  open: createAction("[modal] OPEN", createPayload),
  close: createAction("[modal] CLOSE", createPayload),
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
    const routerState = yield select(router.selectors.state);
    const newRouterState = R.mergeDeepRight(routerState, {
      [name]: { isOpen: true, props },
    });
    yield put(router.actions.push({ state: newRouterState }));
  });

  yield takeEvery(actions.close, function* (action) {
    const { name, props } = action.payload;
    const routerState = yield select(router.selectors.state);
    const newRouterState = R.mergeDeepRight(routerState, {
      [name]: { isOpen: false, props },
    });
    yield put(router.actions.push({ state: newRouterState }));
  });
}

export default {
  reducer,
  actions,
  selectors,
  saga,
};
