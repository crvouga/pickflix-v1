import React from "react";
import { MutateSuccessAction, RequestFailureAction } from "redux-query";
import { delay, put, select, spawn, takeLatest } from "redux-saga/effects";
import { actions, selectors } from "../../redux";
import { takeQueryResponse } from "../../redux/query/saga";
import { CloseSnackbarButton, ViewListButton } from "../../snackbar/Snackbar";
import * as queryConfigs from "./query-configs";

function* createListSaga() {
  yield takeLatest(actions.lists.createList, function* (action) {
    const config = queryConfigs.createListMutation(action.payload);

    yield put(actions.query.mutateAsync(config));

    const {
      success,
      failure,
    }: {
      success: MutateSuccessAction;
      failure: RequestFailureAction;
    } = yield takeQueryResponse(config);

    if (success) {
      const list = success.responseBody;
      yield put(
        actions.snackbar.display({
          message: `Created "${list.title}"`,
          action: (
            <React.Fragment>
              <ViewListButton list={list} />
            </React.Fragment>
          ),
        })
      );
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
    yield put(actions.router.goBack());
    const { success, failure } = yield takeQueryResponse(config);

    if (success) {
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
        actions.snackbar.display({
          message: `Added to "${list.title}"`,
          action: (
            <React.Fragment>
              <ViewListButton list={list} />
            </React.Fragment>
          ),
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

    const config = queryConfigs.editListMutation(listInfo);
    yield put(actions.query.mutateAsync(config));
    const { success, failure } = yield takeQueryResponse(config);

    if (success) {
      yield put(
        actions.snackbar.display({
          message: "Saved changes",
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

function* getListsSaga() {
  yield takeLatest(actions.lists.getLists, function* (action) {
    yield delay(1000);
    const { attempts, timeout } = action.payload;
    for (let i = 0; i < attempts; i++) {
      const listRequest = queryConfigs.listsRequest();
      yield put(actions.query.requestAsync(listRequest));
      const { success, failure } = yield takeQueryResponse(listRequest);
      if (success) {
        break;
      }
      if (failure) {
      }
      yield delay(timeout);
    }
  });
}

export default function* () {
  yield* [
    spawn(getListsSaga),
    spawn(deleteListSaga),
    spawn(createListSaga),
    spawn(addListItemSaga),
    spawn(editListSaga),
    spawn(deleteListItemSaga),
  ];
}
