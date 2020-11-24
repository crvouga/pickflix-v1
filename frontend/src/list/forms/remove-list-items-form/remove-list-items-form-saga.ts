import { put, select, take } from "redux-saga/effects";
import { historyEventChannel } from "../../../app/providers/HistoryProvider";
import { IsSelecting, removeListItemsForm } from "./remove-list-items-form";

export function* removeListItemsFormSaga() {
  while (true) {
    yield take(historyEventChannel);
    const isSelecting: IsSelecting = yield select(
      removeListItemsForm.selectors.isSelecting
    );
    if (isSelecting) {
      yield put(removeListItemsForm.actions.setIsSelecting(false));
      yield put(removeListItemsForm.actions.setListItemIds({}));
    }
  }
}
