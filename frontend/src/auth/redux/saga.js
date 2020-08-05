import axios from "axios";
import { call, put, takeEvery, takeLeading } from "redux-saga/effects";
import { baseURL } from "../../api";
import actions from "./actions";

const getUser = async () => {
  const response = await axios({
    baseURL,
    method: "GET",
    url: "/api/auth/user",
    withCredentials: true,
  });
  return response.data.user;
};

const postSessionSignOut = async () => {
  const response = await axios({
    baseURL,
    method: "POST",
    url: "/api/auth/sessionSignOut",
    withCredentials: true,
  });
  return response;
};

const postSessionSignIn = async (idToken) => {
  const response = await axios({
    baseURL,
    method: "post",
    url: "/api/auth/sessionSignIn",
    data: {
      idToken,
    },
    withCredentials: true,
  });
  return response;
};

const deleteUser = async () => {
  const response = await axios({
    baseURL,
    method: "DELETE",
    url: "/api/auth/user",
    withCredentials: true,
  });
  return response;
};

export default function* () {
  yield put(actions.setError(null));

  yield takeEvery(actions.signIn, function* (action) {
    yield put(actions.setError(null));
    yield put(actions.setStatus("loading"));
    const idToken = action.payload.idToken;
    yield call(postSessionSignIn, idToken);
    yield put(actions.getUser());
  });

  yield takeLeading(actions.signOut, function* () {
    try {
      yield put(actions.setError(null));
      yield put(actions.setStatus("loading"));
      yield call(postSessionSignOut);
      yield put(actions.setUser(false));
    } catch (error) {
      yield put(actions.setError(error));
    } finally {
      yield put(actions.setStatus(null));
    }
  });

  yield takeEvery(actions.getUser, function* () {
    try {
      yield put(actions.setError(null));
      yield put(actions.setStatus("loading"));
      const user = yield call(getUser);
      yield put(actions.setUser(user));
    } catch (error) {
      yield put(actions.setError(error));
    } finally {
      yield put(actions.setStatus(null));
    }
  });

  yield put(actions.getUser());

  yield takeLeading(actions.deleteAccount, function* () {
    try {
      yield put(actions.setError(null));
      yield put(actions.setStatus("loading"));
      yield call(deleteUser);
      yield put(actions.setUser(false));
    } catch (error) {
      yield put(actions.setError(error));
    } finally {
      yield put(actions.setStatus(null));
    }
  });
}
