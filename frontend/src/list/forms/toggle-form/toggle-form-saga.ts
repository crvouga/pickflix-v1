import { toggleForm } from "./toggle-form";
import { call, takeEvery, put, select } from "redux-saga/effects";
import { toggleKey } from "../../../common/utility";
import { postListItem, deleteListItems } from "../../query";

export function* toggleFormSaga() {
  yield takeEvery(toggleForm.actions.toggle, function* (action) {
    const { mediaId, listId } = action.payload;
    const previousListIds: { [listId: string]: string } = yield select(
      toggleForm.selectors.listIds
    );
    const nextListIds = toggleKey(listId, previousListIds);
    yield put(toggleForm.actions.setListIds(nextListIds));
    try {
      if (listId in nextListIds) {
        yield call(postListItem, { mediaId, listId });
      } else {
        yield call(deleteListItems, [{ mediaId, listId }]);
      }
    } catch (error) {}
  });
}
