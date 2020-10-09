import saga from "./saga";
import * as actions from "./actions";

import { createReducer } from "@reduxjs/toolkit";

export default {
  reducer: createReducer({}, {}),
  saga,
  actions,
  selectors: {},
};
