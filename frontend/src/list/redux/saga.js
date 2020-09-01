import { call, takeLatest, take, put, select } from "redux-saga/effects";
import { actions, selectors } from "../../redux";
import backendAPI from "../../backendAPI";

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
export default function* () {
  yield takeLatest(actions.list.addToList, addToListSaga);
}
