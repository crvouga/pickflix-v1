import { call, put, select, takeLatest } from "redux-saga/effects";
import { actions, selectors } from "../../../../redux";
import firebase from "../../../firebase";
import { SignInMethod, Step } from "../constants";

const getSignInMethodsForEmail = (email) =>
  firebase.auth().fetchSignInMethodsForEmail(email);

function* emailStepToNextStepSaga(action) {
  const { email } = action.payload;
  yield put(actions.signInForm.setValues({ email }));
  yield put(actions.signInForm.setStatus("loading"));
  const signInMethods = yield call(getSignInMethodsForEmail, email);
  yield put(actions.signInForm.setStatus(null));
  const nextStep =
    signInMethods.length === 0
      ? Step.emailRegister
      : signInMethods.includes(SignInMethod.Password)
      ? Step.emailPassword
      : Step.emailTaken;
  yield put(actions.signInForm.setStep(nextStep));
}

function* nextStepSaga(action) {
  switch (yield select(selectors.signInForm.step)) {
    case Step.email:
      yield* emailStepToNextStepSaga(action);
      break;
    default:
      break;
  }
}

export default function* () {
  yield takeLatest(actions.signInForm.nextStep, nextStepSaga);
}
