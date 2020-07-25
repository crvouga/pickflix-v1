import {
  takeLeading,
  takeEvery,
  call,
  delay,
  put,
  select,
  cancelled,
  takeLatest,
} from "redux-saga/effects";
import actions from "./actions";
import * as selectors from "./selectors";
import api from "../../api";
import * as R from "ramda";

const fetchSearch = async (config) => {
  if (config.params.query === "") {
    return { results: [] };
  }
  const response = await api.get("/api/tmdb/search/multi", config);
  return response.data;
};

function* fetchResponseSaga() {
  const input = yield select(selectors.input);
  const currentPage = yield select(selectors.currentPage);
  const config = {
    params: {
      page: currentPage + 1,
      query: encodeURI(input.text),
    },
  };
  yield put(actions.setStatus("loading"));
  const response = yield call(fetchSearch, config);
  yield put(actions.setStatus("success"));
  return response;
}

export default function* () {
  yield takeLatest(actions.setInput, function* () {
    try {
      yield delay(1000);
      yield put(actions.setResponses([]));
      yield put(actions.fetch());
    } catch (e) {
    } finally {
      if (yield cancelled()) {
        console.log("CANCELLLED");
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
    const history = yield select(selectors.history);
    const newHistory = R.pipe(
      R.append(result),
      R.uniqBy(R.prop("id")),
      R.take(100)
    )(history);

    yield put(actions.setHistory(newHistory));
  });
}
