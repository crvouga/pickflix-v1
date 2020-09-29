import * as R from "ramda";
export const messageList = (state) => state.chat.messageList;
export const text = (state) => state.chat.text;
export const tags = (state) => state.chat.tags;
export const options = (state) => state.chat.options;
export const status = (state) => state.chat.status;
export const latestMessage = R.pipe(messageList, R.last);
