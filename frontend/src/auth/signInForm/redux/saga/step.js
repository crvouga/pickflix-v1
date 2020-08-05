import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import firebase from "../../../firebase";
import actions from "../actions";
import { Step, SignInMethod } from "../constants";
import selectors from "../selectors";

function* emailStepToNextStepSaga(action) {
  const { email } = action.payload;
  yield put(actions.setValues({ email }));

  yield put(actions.setStatus("loading"));
  const signInMethods = yield call(() =>
    firebase.auth().fetchSignInMethodsForEmail(email)
  );

  yield put(actions.setStatus(null));

  const nextStep =
    signInMethods.length === 0
      ? Step.emailRegister
      : signInMethods.includes(SignInMethod.Password)
      ? Step.emailPassword
      : Step.emailTaken;

  yield put(actions.setStep(nextStep));
}

function* nextStepSaga(action) {
  switch (yield select(selectors.step)) {
    case Step.email:
      yield* emailStepToNextStepSaga(action);
      break;
  }
}

export default function* () {
  yield takeLatest(actions.nextStep, nextStepSaga);
}
