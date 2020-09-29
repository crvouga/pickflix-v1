import { put, select, takeEvery } from "redux-saga/effects";
import { actions, selectors } from "../index";
import { RouterLocationState, RouterState } from "./types";

export default function* () {
  yield takeEvery(actions.router.open, function* (action) {
    const { name, props } = action.payload;

    const router: RouterState = yield select(selectors.router.router);

    const newLocationState: RouterLocationState = {
      ...router.location.state,
      [name]: {
        isOpen: true,
        props,
      },
    };

    yield put(actions.router.push({ state: newLocationState }));
  });

  yield takeEvery(actions.router.close, function* (action) {
    const { name } = action.payload;

    const router: RouterState = yield select(selectors.router.router);

    const newLocationState: RouterLocationState = {
      ...router.location.state,
      ...{
        [name]: {
          isOpen: false,
        },
      },
    };

    yield put(actions.router.push({ state: newLocationState }));
  });
}
