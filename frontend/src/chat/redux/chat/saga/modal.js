import { fork, put, select, take } from "redux-saga/effects";
import modal from "../../../../common/redux/modal";
import router from "../../../../common/redux/router";

export default function* () {
  /**  close chat when pathname changes */
  yield fork(function* () {
    while (true) {
      const previousPathname = yield select(router.selectors.pathname);
      yield take(router.actions.push);
      const currentPathname = yield select(router.selectors.pathname);
      const isChatOpen = yield select(modal.selectors.isOpen("chat"));
      if (previousPathname !== currentPathname && isChatOpen) {
        yield put(modal.actions.close("chat"));
      }
    }
  });
}
