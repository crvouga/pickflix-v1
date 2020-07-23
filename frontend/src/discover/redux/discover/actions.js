import { createAction } from "@reduxjs/toolkit";

export default {
  setChips: createAction("discover/setChips"),
  setOptions: createAction("discover/setOptions"),
  setResponses: createAction("discover/setResponses"),
  load: createAction("discover/load"),
  setStatus: createAction("discover/setStatus"),
};
