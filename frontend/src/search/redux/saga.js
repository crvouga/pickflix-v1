import {
  takeLeading,
  takeEvery,
  call,
  delay,
  put,
  select,
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

export default function* () {
  yield takeEvery(actions.setInput, function* () {
    yield delay(200);

    yield put(actions.setResponses([]));
    yield put(actions.fetch());
  });

  yield takeLeading(actions.fetch, function* () {
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
    const responses = yield select(selectors.responses);
    yield put(actions.setResponses(R.append(response, responses)));
  });

  yield takeEvery(actions.chose, function* (action) {
    const result = action.payload;
    const history = yield select(selectors.history);
    const newHistory = R.append(result, R.uniqBy(R.prop("id"), history));
    yield put(actions.setHistory(newHistory));
  });
}
