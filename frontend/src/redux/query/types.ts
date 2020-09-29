import { Entities, QueriesState } from "redux-query";

export interface QueryState {
  queries: QueriesState;
  entities: Entities;
}
