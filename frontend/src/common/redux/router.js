import { createAction } from "@reduxjs/toolkit";
import { push, replace, go, goBack, goForward } from "connected-react-router";

/**

"wrapActionCreator" rationale

Without
function* saga() {
  yield take(actionCreator().type)
}

With
function* saga() {
  yield take(actionCreator)
}

*/

const actionTypes = {
  LOCATION_CHANGE: "@@router/LOCATION_CHANGE",
};

const wrapActionCreator = (actionCreator) =>
  createAction(actionCreator().type, actionCreator);

const actions = {
  push: wrapActionCreator(push),
  replace: wrapActionCreator(replace),
  go: wrapActionCreator(go),
  goBack: wrapActionCreator(goBack),
  goForward: wrapActionCreator(goForward),
};

const selectors = {
  location: (state) => state.router.location,
  pathname: (state) => state.router.location.pathname,
  state: (state) => state.router.location.state,
  query: (state) => state.router.location.query,
};

export default { selectors, actions, actionTypes };
