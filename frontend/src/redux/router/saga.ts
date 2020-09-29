import * as R from "ramda";
import { put, select, takeEvery } from "redux-saga/effects";
import * as actions from "./actions";
import * as selectors from "./selectors";
import { RouterLocationState, RouterState } from "./types";

export default function* () {
  yield takeEvery(actions.open, function* (action) {
    const { name, props } = action.payload;

    const router: RouterState = yield select(selectors.router);

    const newLocationState: RouterLocationState = {
      ...router.location.state,
      [name]: {
        isOpen: true,
        props,
      },
    };

    yield put(actions.push({ state: newLocationState }));
  });

  yield takeEvery(actions.close, function* (action) {
    const { name } = action.payload;

    const router: RouterState = yield select(selectors.router);

    const newLocationState: RouterLocationState = {
      ...router.location.state,
      ...{
        [name]: {
          isOpen: false,
        },
      },
    };

    yield put(actions.push({ state: newLocationState }));
  });
}
