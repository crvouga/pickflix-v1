import { createAction } from "@reduxjs/toolkit";

export const setOpen = createAction("discover/setOpen");
export const setTagQuery = createAction("discover/setTagQuery");
export const setTags = createAction("discover/setTags");
export const setResponses = createAction("discover/setResponses");
export const setResponseStatus = createAction("discover/setResponseStatus");
export const fetch = createAction("discover/fetch");
export const selected = createAction("discover/selected");
export const unselected = createAction("discover/unselected");
export const toggle = createAction("discover/toggle");
export const newTags = createAction("discover/newTags");
export const tagQueryChanged = createAction("discover/tagQueryChanged");
