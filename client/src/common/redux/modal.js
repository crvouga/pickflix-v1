import { createAction, createReducer } from "@reduxjs/toolkit";
import * as R from "ramda";

const createPayload = (name, props) => ({
  payload: { name, props },
});

const actions = {
  open: createAction("modal/open", createPayload),
  close: createAction("modal/close", createPayload),
};

const initialSttae = {};

const reducer = createReducer(initialSttae, {
  [actions.open]: (state, { payload: { name, props } }) => {
    state[name] = { isOpen: true, props };
  },

  [actions.close]: (state, { payload: { name, props } }) => {
    state[name] = { isOpen: false, props };
  },
});

const selectors = {
  isOpen: R.curry((name, state) =>
    R.pathOr(false, ["modal", name, "isOpen"], state)
  ),
  props: R.curry((name, state) =>
    R.pathOr({}, ["modal", name, "props"], state)
  ),
};

export default {
  reducer,
  actions,
  selectors,
};
