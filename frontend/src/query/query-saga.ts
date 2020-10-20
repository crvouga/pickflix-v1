import { call, takeEvery } from "redux-saga/effects";
import { auth } from "../auth/redux/auth";
import { queryCache } from "./query-cache";

export function* querySaga() {
  /* 
    refetch all data associated when user signs in or out
  */
  yield takeEvery(
    [auth.actions.signedOut, auth.actions.signedOut],
    function* () {
      yield call(() => {
        queryCache.invalidateQueries((query) => {
          return query.queryKey.includes("user");
        });
      });
    }
  );
}
