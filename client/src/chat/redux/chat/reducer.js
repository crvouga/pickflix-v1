import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";

export default createReducer(
  {
    messageList: [],
    tags: [],
    text: "",
    options: [],
    focused: true, // chat input is focus state
  },
  {
    [actions.sendMessage]: (state, action) => {
      const messageList = state.messageList;
      messageList.push(action.payload);
      messageList.slice(Math.max(messageList.length - 100, 0));
    },
    [actions.recieveMessage]: (state, action) => {
      const messageList = state.messageList;
      messageList.push(action.payload);
      messageList.slice(Math.max(messageList.length - 100, 0));
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
    [actions.setFocus]: (state, action) => {
      state.focused = action.payload;
    },
  }
);
