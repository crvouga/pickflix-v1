import { createReducer } from "@reduxjs/toolkit";
import * as R from "ramda";
import * as actions from "./actions";

const setter = R.curry((key, state, action) =>
  R.assoc(key, action.payload, state)
);

export default createReducer(
  {
    open: false,
    tagQuery: "",
    tags: {},
    selectedTags: {},
    responses: [],
    responseStatus: "loading",
  },
  {
    [actions.setOpen]: setter("open"),
    [actions.setTagQuery]: setter("tagQuery"),
    [actions.setTags]: setter("tags"),
    [actions.setResponses]: setter("responses"),
    [actions.setResponseStatus]: setter("responseStatus"),
    [actions.tagQueryChanged]: (state, action) => {
      state.tagQuery = action.payload;
    },
    //
    [actions.newTags]: (state, action) => {
      const tags = action.payload;
      for (const tag of tags) {
        state.tags[tag.id] = tag;
      }
    },
    [actions.selected]: (state, action) => {
      const tags = action.payload;
      for (const tag of tags) {
        state.tag[tag.id] = tag;
        state.selectedTags[tag.id] = tag;
      }
    },
    [actions.unselected]: (state, action) => {
      const tags = action.payload;
      for (const tag of tags) {
        delete state.selectedTags[tag.id];
      }
    },
    [actions.toggle]: (state, action) => {
      const tag = action.payload;

      if (state.selectedTags[tag.id]) {
        delete state.selectedTags[tag.id];
      } else {
        state.selectedTags[tag.id] = tag;
      }
    },
  }
);
