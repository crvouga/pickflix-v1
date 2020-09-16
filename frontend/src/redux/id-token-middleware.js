import { actionTypes } from "redux-query";
import firebase from "../auth/firebase";

const { MUTATE_ASYNC, REQUEST_ASYNC } = actionTypes;

export default (store) => (next) => (action) => {
  if (
    action &&
    (action.type === MUTATE_ASYNC || action.type === REQUEST_ASYNC)
  ) {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      currentUser
        .getIdToken()
        .then((idToken) => {
          const options = action.options || {};
          const headers = options.headers || {};
          const updatedAction = {
            ...action,
            options: {
              ...options,
              headers: {
                ...headers,
                authorization: idToken,
              },
            },
          };
          next(updatedAction);
        })
        .catch((error) => {
          console.error(error);
          next(action);
        });
    } else {
      next(action);
    }
  } else {
    next(action);
  }
};
