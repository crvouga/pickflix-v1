import saga from "./saga";
import * as actions from "./actions";
import * as selectors from "./selectors";
import { createReducer } from "@reduxjs/toolkit";

export default {
  reducer: createReducer({}, {}),
  saga,
  actions,
  selectors,
};
