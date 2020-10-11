import { takeEvery } from "redux-saga/effects";
import { queryCache } from "./query-cache";
import { actions } from "../redux";

/* 

refetch all data associated when user signs in or out

*/
export default function* () {
  yield takeEvery(actions.auth.setAuthStatus, function* () {
    queryCache.invalidateQueries((query) => query.queryKey.includes("user"));
  });
}
