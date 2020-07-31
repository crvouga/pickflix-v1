import { call, put, select, takeLatest } from "redux-saga/effects";
import firebase from "../../firebase";
import actions from "../actions";
import constants from "../constants";
import selectors from "../selectors";

const { FormStep, Method } = constants;

function* fromEmailStep(action) {
  const { email } = action.payload;

  yield put(actions.setFormValues({ email }));

  const signInMethods = yield call(() =>
    firebase.auth().fetchSignInMethodsForEmail(email)
  );

  yield put(actions.setSignInMethods(signInMethods));

  if (signInMethods.length === 0) {
    yield put(actions.setFormStep(FormStep.emailRegister));
  } else if (signInMethods.includes(Method.Password)) {
    yield put(actions.setFormStep(FormStep.emailPassword));
  } else {
    yield put(actions.setFormStep(FormStep.emailTaken));
  }
}

export default function* () {
  yield takeLatest(actions.nextFormStep, function* (action) {
    const currentFormStep = yield select(selectors.formStep);

    switch (currentFormStep) {
      case FormStep.signIn:
        yield put(actions.setFormStep(FormStep.email));
        break;

      case FormStep.email:
        yield* fromEmailStep(action);
        break;
    }
  });
}
