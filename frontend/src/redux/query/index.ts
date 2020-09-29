import * as R from "ramda";
import { combineReducers } from "redux";
import {
  actionTypes,
  cancelQuery,
  entitiesReducer,
  mutateAsync,
  MutateSuccessAction,
  queriesReducer,
  queryMiddleware,
  requestAsync,
  RequestFailureAction,
  updateEntities,
} from "redux-query";
import superagentInterface from "redux-query-interface-superagent";
import { race, take } from "redux-saga/effects";
import * as selectors from "./selectors";

const { MUTATE_SUCCESS, MUTATE_FAILURE } = actionTypes;
const namespace = "query";

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

export function* takeQueryResponse({ url }: { url: string }) {
  const {
    success,
    failure,
  }: {
    success: MutateSuccessAction;
    failure: RequestFailureAction;
  } = yield race({
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
