import { createAction } from "@reduxjs/toolkit";
import * as R from "ramda";

const assocId = (message) => ({
  payload: R.assoc("id", Math.random(), message),
});

export default {
  sendMessage: createAction("[chat] SEND_MESSAGE", assocId),
  recieveMessage: createAction("[chat] RECIEVE_MESSAGE", assocId),
  setTags: createAction("[chat] SET_TAGS"),
  setText: createAction("[chat] SET_TEXT"),
  setOptions: createAction("[chat] SET_OPTIONS"),
  setStatus: createAction("[chat] SET_STATUS"),
};
