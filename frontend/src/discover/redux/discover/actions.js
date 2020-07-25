import { createAction } from "@reduxjs/toolkit";

export default {
  setInput: createAction("discover/setInput"),
  setOptions: createAction("discover/setOptions"),
  setResponses: createAction("discover/setResponses"),
  setStatus: createAction("discover/setStatus"),
  fetch: createAction("discover/fetch"),
};
