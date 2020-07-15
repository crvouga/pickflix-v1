import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";

export default createReducer(
  {
    messageList: [],
    tags: [],
    text: "",
    options: [],
  },
  {
    [actions.sendMessage]: (state, action) => {
      state.messageList.push(action.payload);
    },
    [actions.recieveMessage]: (state, action) => {
      state.messageList.push(action.payload);
    },
    [actions.setTags]: (state, action) => {
      state.tags = action.payload;
    },
    [actions.setText]: (state, action) => {
      state.text = action.payload;
    },
    [actions.setOptions]: (state, action) => {
      state.options = action.payload;
    },
  }
);
