import { createReducer } from "@reduxjs/toolkit";
import * as actions from "./actions";
import * as selectors from "./selectors";
import saga from "./saga";
const reducer = createReducer({}, {});

export default {
  reducer,
  actions,
  selectors,
  saga,
};
