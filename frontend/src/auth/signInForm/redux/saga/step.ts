import { call, put, select, takeLatest } from "redux-saga/effects";
import { actions, selectors } from "../../../../redux";
import firebase from "../../../firebase";
import { SignInMethod, Step } from "../types";

const getSignInMethodsForEmail = (email: string) =>
  firebase.auth().fetchSignInMethodsForEmail(email);

function* emailStepToNextStepSaga(action: { payload: { email: string } }) {
  const { email } = action.payload;

  yield put(actions.signInForm.setValues({ email }));

  yield put(actions.signInForm.setStatus("loading"));

  const signInMethods: string[] = yield call(getSignInMethodsForEmail, email);

  yield put(actions.signInForm.setStatus("success"));

  const nextStep =
    signInMethods.length === 0
      ? Step.emailRegister
      : signInMethods.includes(SignInMethod.Password)
      ? Step.emailPassword
      : Step.emailTaken;

  yield put(actions.signInForm.setStep(nextStep));
}

export default function* () {
  yield takeLatest(actions.signInForm.nextStep, function* (action) {
    const currentStep = yield select(selectors.signInForm.step);

    switch (currentStep) {
      case Step.email:
        yield emailStepToNextStepSaga(action);
        break;
      default:
        break;
    }
  });
}
