export const lists = (state) => state.lists.lists || [];
export const error = (state) => state.lists.error || {};
export const status = (state) => state.lists.status || "loading";
export const listItemAdditions = (state) => state.lists.listItemAdditions || [];
export const listItemDeletions = (state) => state.lists.listItemDeletions || [];
