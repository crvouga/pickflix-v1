import { createAction } from "@reduxjs/toolkit";

export default {
  setInput: createAction("search/setInput"),
  setResponses: createAction("search/setResponses"),
  setStatus: createAction("search/setStatus"),
  setHistory: createAction("search/setHistory"),
  fetch: createAction("search/fetch"),
  chose: createAction("search/chose"),
};
