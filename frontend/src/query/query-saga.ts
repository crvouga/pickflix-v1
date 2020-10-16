import { takeEvery } from "redux-saga/effects";
import { auth } from "../auth/redux/auth";
import { queryCache } from "./query-cache";

/* 

refetch all data associated when user signs in or out

*/

export function* querySaga() {
  yield takeEvery(
    [auth.actions.signedOut, auth.actions.signedOut],
    function* () {
      queryCache.invalidateQueries((query) => query.queryKey.includes("user"));
    }
  );
}
