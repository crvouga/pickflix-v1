import { put, select, take } from "redux-saga/effects";
import { historyEventChannel } from "../../providers/HistoryProvider";
import { IsOpenByName, modal } from "./modal";

export function* modalSaga() {
  //disabled for right now
  while (false) {
    yield take(historyEventChannel);
    const isOpenByName: IsOpenByName = yield select(
      modal.selectors.isOpenByName
    );
    if (Object.values(isOpenByName).some((isOpen) => isOpen)) {
      yield put(modal.actions.setIsOpenByName({}));
    }
  }
}
