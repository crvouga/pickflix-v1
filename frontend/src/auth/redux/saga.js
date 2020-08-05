import axios from "axios";
import { put, call, takeEvery, takeLeading } from "redux-saga/effects";
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

const deleteAccount = async () => {
  const response = await axios({
    baseURL,
    method: "DELETE",
    url: "/api/auth/deleteAccount",
    withCredentials: true,
  });
  return response;
};

export default function* () {
  yield takeEvery(actions.signIn, function* (action) {
    const idToken = action.payload.idToken;
    yield call(postSessionSignIn, idToken);
    yield put(actions.getUser());
  });

  yield takeLeading(actions.signOut, function* () {
    yield call(postSessionSignOut);
    yield put(actions.setUser(false));
  });

  yield takeEvery(actions.getUser, function* () {
    try {
      const user = yield call(getUser);
      yield put(actions.setUser(user));
    } catch (error) {}
  });
  yield put(actions.getUser());

  yield takeLeading(actions.deleteAccount, function* () {
    yield call(deleteAccount);
    yield put(actions.setUser(false));
  });
}
