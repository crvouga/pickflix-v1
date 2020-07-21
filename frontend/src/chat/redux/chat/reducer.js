import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";
import * as R from "ramda";

const MESSAGE_LIST_CAPACITY = 20;

const appendMessage = (state, action) => {
  state.messageList.push(action.payload);
  state.messageList = R.takeLast(MESSAGE_LIST_CAPACITY, state.messageList);
};

export default createReducer(
  {
    messageList: [],
    tags: [],
    text: "",
    options: [],
    isFetchingOptions: false,
  },
  {
    [actions.sendMessage]: appendMessage,
    [actions.recieveMessage]: appendMessage,
    [actions.setTags]: (state, action) => {
      state.tags = action.payload;
    },
    [actions.setText]: (state, action) => {
      state.text = action.payload;
    },
    [actions.setOptions]: (state, action) => {
      state.options = action.payload;
    },
    [actions.setIsFetchingOptions]: (state, action) => {
      state.isFetchingOptions = action.payload;
    },
  }
);
