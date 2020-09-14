import saga from "./saga";
import * as actions from "./actions";
import * as selectors from "./selectors";
import { createReducer } from "@reduxjs/toolkit";

const setState = (state, action) => ({ ...state, ...action.payload });
const reducer = createReducer(null, {
  [actions._setState]: setState,
});

export default {
  reducer,
  saga,
  actions,
  selectors,
};
