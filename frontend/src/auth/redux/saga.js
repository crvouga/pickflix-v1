import { call, put, takeEvery, takeLeading } from "redux-saga/effects";
import api from "../../api";
import actions from "./actions";

function* tryCatch(saga) {
  try {
    yield put(actions.setError(null));
    yield put(actions.setStatus("loading"));
    yield* saga();
  } catch (error) {
    yield put(actions.setError(error));
  } finally {
    yield put(actions.setStatus(null));
  }
}

export default function* () {
  yield put(actions.setError(null));

  yield takeEvery(actions.signIn, function* (action) {
    yield tryCatch(function* () {
      const idToken = action.payload.idToken;
      yield call(api, api.post, "/api/auth/signIn", { idToken });
      yield put(actions.getUser());
    });
  });

  yield takeLeading(actions.signOut, function* () {
    yield tryCatch(function* () {
      yield call(api, api.post, "/api/auth/signOut");
      yield put(actions.setUser(false));
    });
  });

  yield takeEvery(actions.getUser, function* () {
    yield tryCatch(function* () {
      const response = yield call(api, api.get, "/api/auth/user");
      const user = response.data.user;
      yield put(actions.setUser(user));
    });
  });

  yield put(actions.getUser());

  yield takeLeading(actions.deleteAccount, function* () {
    yield tryCatch(function* () {
      yield call(api, api.delete, "/api/auth/user");
      yield put(actions.setUser(false));
    });
  });
}
