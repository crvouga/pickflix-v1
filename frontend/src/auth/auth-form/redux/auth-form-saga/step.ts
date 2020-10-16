import { call, put, select, takeLatest } from "redux-saga/effects";
import firebase from "../../../firebase";
import { authForm } from "../auth-form";
import { SignInMethod, Step } from "../types";

const getSignInMethodsForEmail = (email: string) =>
  firebase.auth().fetchSignInMethodsForEmail(email);

function* emailStepToNextStepSaga(action: { payload: { email: string } }) {
  const { email } = action.payload;

  yield put(authForm.actions.setValues({ email }));

  yield put(authForm.actions.setStatus("loading"));

  const signInMethods: string[] = yield call(getSignInMethodsForEmail, email);

  yield put(authForm.actions.setStatus("success"));

  const nextStep =
    signInMethods.length === 0
      ? Step.emailRegister
      : signInMethods.includes(SignInMethod.Password)
      ? Step.emailPassword
      : Step.emailTaken;

  yield put(authForm.actions.setStep(nextStep));
}

export default function* () {
  yield takeLatest(authForm.actions.nextStep, function* (action) {
    const currentStep = yield select(authForm.selectors.step);

    switch (currentStep) {
      case Step.email:
        yield emailStepToNextStepSaga(action);
        break;
      default:
        break;
    }
  });
}
