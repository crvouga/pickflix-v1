import { REHYDRATE } from "redux-persist";
import { spawn, take } from "redux-saga/effects";
import { discoverMovieSaga } from "../../discover/redux/discover-saga";
import { removeListItemsFormSaga } from "../../list/forms/remove-list-items-form/remove-list-items-form-saga";
import { reviewVoteStatesSaga } from "../../review/form/vote/review-vote-states-saga";
import { modalSaga } from "../modals/redux/modal-saga";
import { snackbarSaga } from "../snackbar/redux/snackbar-saga";

export function* rootSaga() {
  yield take(REHYDRATE);
  yield* [
    spawn(snackbarSaga),
    spawn(discoverMovieSaga),
    spawn(modalSaga),
    spawn(removeListItemsFormSaga),
    spawn(reviewVoteStatesSaga),
  ];
}
