import saga from "./saga";
import * as actions from "./actions";
import * as selectors from "./selectors";
import { createReducer } from "@reduxjs/toolkit";

const reducer = createReducer({}, {});

export default {
  reducer,
  saga,
  actions,
  selectors,
};
