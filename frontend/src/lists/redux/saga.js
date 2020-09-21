import * as R from "ramda";
import { mutateAsync, actionTypes } from "redux-query";
import { put, takeLatest, take, race } from "redux-saga/effects";
import { actions } from "../../redux";
import * as queryConfigs from "./query-configs";

export default function* () {
  yield takeLatest(actions.lists.deleteList, deleteListSaga);
  yield takeLatest(actions.lists.createList, createListSaga);
  yield takeLatest(actions.lists.addListItem, addListItemSaga);
}

function* createListSaga(action) {
  const listInfo = action.payload;
}

function* deleteListSaga(action) {
  const listId = action.payload;
  yield put(mutateAsync(queryConfigs.deleteListMutation({ listId })));
  yield put(actions.router.goBack());
}

function* addListItemSaga({ payload: { tmdbMediaId, tmdbMediaType, listId } }) {
  const queryConfig = queryConfigs.addListItemMutation({
    listId,
    tmdbMediaId,
    tmdbMediaType,
  });

  yield put(actions.query.mutateAsync(queryConfig));

  const url = queryConfig.url;

  const { success, failure } = yield race({
    success: take(R.whereEq({ type: actionTypes.MUTATE_SUCCESS, url })),
    failure: take(R.whereEq({ type: actionTypes.MUTATE_FAILURE, url })),
  });

  if (success) {
    yield put(
      actions.snackbar.enqueueSnackbar({
        message: success.responseBody.message,
      })
    );
  }
}
