import { createAction } from "@reduxjs/toolkit";
import * as R from "ramda";

const assocId = (message) => ({
  payload: R.assoc("id", Math.random(), message),
});

export default {
  sendMessage: createAction("chat/sendMessage", assocId),
  recieveMessage: createAction("chat/recieveMessage", assocId),
  setTags: createAction("chat/setTags"),
  setText: createAction("chat/setText"),
  setOptions: createAction("chat/setOptions"),
  setFocus: createAction("chat/setFocus"),
  messageListScroll: createAction("chat/messageListScroll"),
};
