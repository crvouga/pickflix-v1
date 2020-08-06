import { call, put, takeLeading } from "redux-saga/effects";
import api from "../../api";
import actions from "./actions";

const postSignIn = (idToken) => api.post("/api/auth/signIn", { idToken });
const postSignOut = () => api.post("/api/auth/signOut");
const getUser = () => api.get("/api/auth/user");
const deleteUser = () => api.delete("/api/auth/user");
export default function* () {
  yield put(actions.setError(null));

  yield takeLeading(actions.signIn, function* (action) {
    try {
      yield put(actions.setError(null));
      yield put(actions.setStatus("loading"));
      const idToken = action.payload.idToken;
      yield call(postSignIn, idToken);
      yield put(actions.getUser());
    } catch (error) {
      yield put(actions.setError(error));
    } finally {
      yield put(actions.setStatus(null));
    }
  });

  yield takeLeading(actions.signOut, function* () {
    try {
      yield put(actions.setError(null));
      yield put(actions.setStatus("loading"));

      yield call(postSignOut);
      yield put(actions.setUser(false));
    } catch (error) {
      yield put(actions.setError(error));
    } finally {
      yield put(actions.setStatus(null));
    }
  });

  yield takeLeading(actions.getUser, function* () {
    try {
      yield put(actions.setError(null));
      yield put(actions.setStatus("loading"));
      const response = yield call(getUser);
      const user = response.data.user;
      yield put(actions.setUser(user));
    } catch (error) {
      yield put(actions.setError(error));
    } finally {
      yield put(actions.setStatus(null));
    }
  });

  yield put(actions.getUser());

  yield takeLeading(actions.deleteUser, function* () {
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
