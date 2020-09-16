import { combineReducers } from "redux";
import {
  cancelQuery,
  entitiesReducer,
  mutateAsync,
  queriesReducer,
  queryMiddleware,
  requestAsync,
  updateEntities,
} from "redux-query";
import superagentInterface from "redux-query-interface-superagent";

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

export default {
  namespace,
  selectors,
  reducer,
  actions,
  middleware: queryMiddleware(
    superagentInterface,
    selectors.queries,
    selectors.entities
  ),
};
