import { Location } from "history";
import { eventChannel } from "redux-saga";
import { put, take, select } from "redux-saga/effects";
import { history } from "../../providers/HistoryProvider";
import { modal, IsOpenByName } from "./modal";

const historyChannel = eventChannel<Location>((emitter) => {
  const unlisten = history.listen((location) => {
    emitter(location);
  });

  return () => {
    unlisten();
  };
});

export function* modalSaga() {
  while (true) {
    yield take(historyChannel);
    const isOpenByName: IsOpenByName = yield select(
      modal.selectors.isOpenByName
    );
    if (Object.values(isOpenByName).some((isOpen) => isOpen)) {
      yield put(modal.actions.setIsOpenByName({}));
    }
  }
}
