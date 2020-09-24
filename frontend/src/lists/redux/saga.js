import { put, select, takeLatest } from "redux-saga/effects";
import { actions, selectors } from "../../redux";
import { takeQueryResponse } from "../../redux/query";
import { SnackbarNames } from "../../snackbar/Snackbar";
import * as queryConfigs from "./query-configs";

function* createListSaga() {
  yield takeLatest(actions.lists.createList, function* (action) {
    const listInfo = action.payload;

    const config = queryConfigs.createListMutation(listInfo);

    yield put(actions.query.mutateAsync(config));

    const { success, failure } = yield takeQueryResponse(config);

    if (success) {
    }

    if (failure) {
    }
  });
}

function* deleteListSaga() {
  yield takeLatest(actions.lists.deleteList, function* (action) {
    const listId = action.payload;

    const config = queryConfigs.deleteListMutation({ listId });

    yield put(actions.query.mutateAsync(config));

    const { success, failure } = yield takeQueryResponse(config);

    if (success) {
      yield put(actions.router.goBack());
    }

    if (failure) {
    }
  });
}

function* addListItemSaga() {
  yield takeLatest(actions.lists.addListItem, function* (action) {
    const { tmdbMediaId, tmdbMediaType, listId } = action.payload;
    const config = queryConfigs.addListItemMutation({
      listId,
      tmdbMediaId,
      tmdbMediaType,
    });

    yield put(actions.query.mutateAsync(config));

    const { success, failure } = yield takeQueryResponse(config);

    if (success) {
      const list = yield select(selectors.lists.list(listId));

      yield put(
        actions.snackbar.show({
          name: SnackbarNames.AddToListSuccess,
          list,
        })
      );
    }

    if (failure) {
    }
  });
}

function* editListSaga() {
  yield takeLatest(actions.lists.editList, function* (action) {
    const listInfo = action.payload;

    const config = queryConfigs.editListMutation({
      listId: listInfo.id,
      ...listInfo,
    });

    yield put(actions.query.mutateAsync(config));
    const { success, failure } = yield takeQueryResponse(config);

    if (success) {
      yield put(
        actions.snackbar.show({
          name: SnackbarNames.EditListSuccess,
        })
      );
    }

    if (failure) {
    }
  });
}

function* deleteListItemSaga() {
  yield takeLatest(actions.lists.deleteListItem, function* (action) {
    const { listId, listItemIds } = action.payload;

    const config = queryConfigs.deleteListItemsMutation({
      listId,
      listItemIds,
    });

    yield put(actions.query.mutateAsync(config));

    const { success, failure } = yield takeQueryResponse(config);

    if (success) {
      //
    }

    if (failure) {
      //
    }
  });
}

export default function* () {
  yield [
    deleteListSaga,
    createListSaga,
    addListItemSaga,
    editListSaga,
    deleteListItemSaga,
  ];
}
