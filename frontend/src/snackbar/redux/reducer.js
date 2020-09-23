import { createReducer } from "@reduxjs/toolkit";
import * as actions from "./actions";

export default createReducer(
  {
    info: {},
    isOpen: false,
  },
  {
    [actions.setIsOpen]: (state, action) => {
      state.isOpen = action.payload;
    },
    [actions.setInfo]: (state, action) => {
      state.info = action.payload;
    },
  }
);
