import * as R from "ramda";
import {
  call,
  cancelled,
  delay,
  put,
  select,
  takeEvery,
  takeLatest,
  takeLeading,
} from "redux-saga/effects";
import api from "../../api";
import actions from "./actions";
import * as selectors from "./selectors";

const fetchSearch = async (config) => {
  if (config.params.query === "") {
    return { results: [] };
  }
  const response = await api.get("/api/tmdb/search/multi", config);
  return response.data;
};

function* fetchResponseSaga() {
  const text = yield select(selectors.text);
  const currentPage = yield select(selectors.currentPage);
  const config = {
    params: {
      page: currentPage + 1,
      query: encodeURI(text),
    },
  };

  const response = yield call(fetchSearch, config);
  yield put(actions.setStatus("success"));
  return response;
}

export default function* () {
  yield takeLatest(actions.setText, function* () {
    yield put(actions.setStatus("loading"));
    yield delay(1000 / 3);
    try {
      yield put(actions.setResponses([]));
      yield put(actions.fetch());
    } catch (e) {
    } finally {
      if (yield cancelled()) {
      }
    }
  });

  yield takeLeading(actions.fetch, function* () {
    const response = yield fetchResponseSaga();
    const responses = yield select(selectors.responses);
    yield put(actions.setResponses(R.append(response, responses)));
  });

  yield takeEvery(actions.chose, function* (action) {
    const result = action.payload;
    const recentlySearched = yield select(selectors.recentlySearched);
    const newRecentlySearched = R.pipe(
      R.append(result),
      R.uniqBy(R.prop("id")),
      R.take(100)
    )(recentlySearched);

    yield put(actions.setRecentlySearched(newRecentlySearched));
  });
}
