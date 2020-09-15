import { call, put, select, take, takeLatest } from "redux-saga/effects";
import backendAPI from "../../backendAPI";
import { actions, selectors } from "../../redux";

const addToList = (listData) => backendAPI.post("/api/list/");

function* addToListSaga(action) {
  const isAuthenticated = yield select(selectors.auth.isAuthenticated);
  if (!isAuthenticated) {
    const currentPathname = yield select(selectors.router.pathname);
    yield put(actions.modal.open("SignInDialog"));
    yield take(actions.auth.signInSuccess);
    yield put(actions.router.push(currentPathname));
    return;
  }

  const { name, mediaId } = action.payload;
  const response = yield call(addToList, { name, mediaId });
}

const createList = (listInfo) => backendAPI.post("/api/lists", listInfo);

function* createListSaga(action) {
  const listInfo = action.payload;

  try {
    const response = yield call(createList, listInfo);
    const data = response.data;
    yield put(
      actions.snackbar.enqueueSnackbar({
        message: data.message,
        options: {
          variant: "info",
        },
      })
    );
  } catch (error) {
    yield put(
      actions.snackbar.enqueueSnackbar({
        message: error.response.data.message,
        options: { variant: "error" },
      })
    );
  }
}

const deleteList = (listId) => backendAPI.delete(`/api/lists/${listId}`);

function* deleteListSaga(action) {
  const listId = action.payload;

  try {
    const response = yield call(deleteList, listId);
    yield put(actions.router.goBack());
    yield put(
      actions.snackbar.enqueueSnackbar({
        message: "Successfully deleted list",
      })
    );
  } catch (error) {
    yield put(
      actions.snackbar.enqueueSnackbar({
        message: "Failed to deleted list",
        options: {
          variant: "error",
        },
      })
    );
  }
}

const getLists = ({ tmdbMediaId }) =>
  backendAPI.get(`/api/lists`, { query: { tmdbMediaIds: [tmdbMediaId] } });

function* fetchLists(action) {
  try {
    yield put(actions.lists.setStatus("loading"));
    const response = yield call(getLists, action.payload);
    const lists = response.data;
    yield put(actions.lists.setLists(lists));
    yield put(actions.lists.setStatus("success"));
  } catch (error) {
    yield put(actions.lists.setError({ message: "Failed to fetched lists." }));
    yield put(actions.lists.setStatus("error"));
  }
}

export default function* () {
  console.log("LISTS SAGA");
  yield takeLatest(actions.lists.deleteList, deleteListSaga);
  yield takeLatest(actions.lists.createList, createListSaga);

  yield takeLatest(actions.lists.fetch, fetchLists);
}
