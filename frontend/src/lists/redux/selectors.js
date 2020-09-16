import { denormalize, schema } from "normalizr";
import { listSchema } from "./schemas";

import * as R from "ramda";

export const entities = (state) => state?.query?.entities || {};

export const listsById = (state) => state?.query?.entities?.lists || {};
export const listItemsById = (state) => state?.query?.entities?.listItems || {};

export const listItems = R.curry((listId, state) =>
  R.filter(R.whereEq({ listId }), R.values(listItemsById(state)))
);

export const list = R.curry((listId, state) => {
  return denormalize(
    R.propOr({}, listId, listsById(state)),
    listSchema,
    entities(state)
  );
});

export const lists = (state) => {
  return R.map((listId) => list(listId, state), R.keys(listsById(state)));
};
