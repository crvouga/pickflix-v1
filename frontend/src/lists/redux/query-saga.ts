import { queryCache, QueryKey, QueryCache } from "react-query";
import { fork, call, takeEvery } from "redux-saga/effects";
import { List, ListItem, patchList, postListItem, queryKeys } from "../data";
import * as actions from "./actions";
import * as R from "ramda";
const getQueryData = (key: QueryKey) => queryCache.getQueryData(key);
const setQueryData = (key: QueryKey, value: any) =>
  queryCache.setQueryData(key, value);
const invalidateQueries = (key: QueryKey) => queryCache.invalidateQueries(key);

function* optimisticEditListSaga() {
  // yield takeEvery(actions.editList, function* (action) {
  //   const { listItemIds, listId } = action.payload;
  //   const key = queryKeys.listItems(listId);

  //   const previousListItems: ListItem[] = yield call(getQueryData, key);

  //   yield call(
  //     setQueryData,
  //     key,
  //     R.innerJoin(
  //       (listItem, id) => listItem.id !== id,
  //       previousListItems,
  //       listItemIds
  //     )
  //   );

  //   try {
  //     const patchedList: List = yield call(delete, {
  //       listId,
  //       title,
  //       description,
  //     });
  //     yield call(setQueryData, key, patchedList);
  //   } catch (error) {
  //     yield call(setQueryData, key, previousList);
  //   } finally {
  //     yield call(invalidateQueries, key);
  //   }
  // });

  yield takeEvery(actions.editList, function* (action) {
    const { title, description, listId } = action.payload;

    const queryKeyList = queryKeys.list(listId);

    const previousList: List = yield call(getQueryData, queryKeyList);

    yield call(setQueryData, queryKeyList, {
      ...previousList,
      title,
      description,
    });

    try {
      const patchedList: List = yield call(patchList, {
        listId,
        title,
        description,
      });
      yield call(setQueryData, queryKeyList, patchedList);
    } catch (error) {
      yield call(setQueryData, queryKeyList, previousList);
    } finally {
      yield call(invalidateQueries, queryKeyList);
    }
  });
}

export default function* () {
  yield fork(optimisticEditListSaga);

  yield takeEvery(actions.addListItem, function* (action) {
    const { listId, tmdbMediaId, tmdbMediaType } = action.payload;

    const postedListItem = yield call(postListItem, {
      listId,
      tmdbMediaId,
      tmdbMediaType,
    });
  });
}
