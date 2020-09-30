import { Middleware } from "redux";
import { actionTypes } from "redux-query";
import firebase from "../../../auth/firebase";
const { MUTATE_ASYNC, REQUEST_ASYNC } = actionTypes;

const isQueryAction = (action: { type: string }) =>
  action.type === MUTATE_ASYNC || action.type === REQUEST_ASYNC;

export const attachAuthorizationHeader: Middleware = () => (next) => (
  action
) => {
  if (!isQueryAction(action)) {
    return next(action);
  }
  const currentUser = firebase.auth().currentUser;

  if (!currentUser) {
    return next(action);
  }

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
};
