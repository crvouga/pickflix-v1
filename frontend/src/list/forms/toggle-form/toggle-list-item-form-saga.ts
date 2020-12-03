import { toggleForm } from "./toggle-list-item-form";
import { call, takeEvery, put, select } from "redux-saga/effects";
import { toggleKey, createEventEmitter } from "../../../common/utility";
import { postListItem, deleteListItems } from "../../query";
import { MediaId } from "../../../media/tmdb/types";

export const eventEmitterToggleForm = createEventEmitter<{
  added: {
    mediaId: MediaId;
    listId: string;
  };
  removed: {
    mediaId: MediaId;
    listId: string;
  };
}>();

export function* toggleFormSaga() {
  yield takeEvery(toggleForm.actions.toggle, function* (action) {
    const { mediaId, listId } = action.payload;
    const previous: { [listId: string]: string } = yield select(
      toggleForm.selectors.markedListIds
    );
    const next = toggleKey(listId, previous);
    yield put(toggleForm.actions.setMarkedListIds(next));
    try {
      if (listId in next) {
        eventEmitterToggleForm.emit("added", {
          mediaId,
          listId,
        });
        yield call(postListItem, { mediaId, listId });
      } else {
        eventEmitterToggleForm.emit("removed", {
          mediaId,
          listId,
        });
        yield call(deleteListItems, [{ mediaId, listId }]);
      }
    } catch (error) {}
  });
}
