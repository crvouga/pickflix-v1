import { queryMiddleware } from "redux-query";
import superagentInterface from "redux-query-interface-superagent";
import { attachAuthorizationHeader } from "./attach-authorization-header-middleware";
import * as selectors from "../selectors";

export default [
  attachAuthorizationHeader,
  queryMiddleware(superagentInterface, selectors.queries, selectors.entities),
];
