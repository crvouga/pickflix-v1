import * as R from "ramda";
import { combineReducers } from "redux";
import {
  actionTypes,
  cancelQuery,
  entitiesReducer,
  mutateAsync,
  queriesReducer,
  queryMiddleware,
  requestAsync,
  updateEntities,
} from "redux-query";
import superagentInterface from "redux-query-interface-superagent";
import { race, take } from "redux-saga/effects";
const { MUTATE_SUCCESS, MUTATE_FAILURE } = actionTypes;

const namespace = "query";

const selectors = {
  query: ({ url }) => (state) =>
    state[namespace]?.queries?.[JSON.stringify({ url })] || {},
  queries: (state) => state[namespace]?.queries || {},
  entities: (state) => state[namespace]?.entities || {},
};

const reducer = combineReducers({
  entities: entitiesReducer,
  queries: queriesReducer,
});

const actions = {
  mutateAsync,
  requestAsync,
  cancelQuery,
  updateEntities,
};

export function* takeQueryResponse({ url }) {
  const { success, failure } = yield race({
    success: take(R.whereEq({ type: MUTATE_SUCCESS, url })),
    failure: take(R.whereEq({ type: MUTATE_FAILURE, url })),
  });
  return { success, failure };
}

function* saga() {}

export default {
  namespace,
  selectors,
  reducer,
  actions,
  saga,
  middleware: queryMiddleware(
    superagentInterface,
    selectors.queries,
    selectors.entities
  ),
};
