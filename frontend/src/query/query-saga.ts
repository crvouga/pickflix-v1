import { Query } from "react-query";
import { takeEvery } from "redux-saga/effects";
import { actions } from "../redux";
import { queryCache } from "./query-cache";

/* 

refetch all data associated when user signs in or out

*/

export default function* () {
  yield takeEvery(actions.auth.setAuthStatus, function* () {
    queryCache.invalidateQueries((query) => query.queryKey.includes("user"));
  });
}
