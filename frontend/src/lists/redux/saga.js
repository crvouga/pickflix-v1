import * as R from "ramda";
import { actionTypes, mutateAsync } from "redux-query";
import { put, race, select, take, takeLatest } from "redux-saga/effects";
import { actions, selectors } from "../../redux";
import * as queryConfigs from "./query-configs";
import { SnackbarNames } from "../../snackbar/Snackbar";

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

  const list = yield select(selectors.lists.list(listId));

  if (success) {
    yield put(
      actions.snackbar.notify({
        name: SnackbarNames.AddToListSuccess,
        list,
      })
    );
  }
}
