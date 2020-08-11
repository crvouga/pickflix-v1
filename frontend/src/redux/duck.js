import reduceReducers from "reduce-reducers";
import * as R from "ramda";

export const createAction = R.curry(
  (path, type, bodyCreator = (payload) => ({ payload })) => (...args) => ({
    type: R.join("/", R.append(type, path)),
    ...bodyCreator(args),
  })
);

const createReducer = R.curry(
  (initialState, reducerMap, state = initialState, action) =>
    R.propOr(R.identity, action.type, reducerMap)(state, action)
);

const payloadReducer = (path, state, action) =>
  R.set(R.lensPath(path), action.payload, state);

export const mergeLeftDuck = (duck1, duck2) => ({
  path: R.or(duck1, duck2),
  reducer: reduceReducers(duck1.reducer, duck2.reducer),
  actions: R.mergeLeft(duck1.actions, duck2.actions),
  selectors: R.mergeLeft(duck1.selectors, duck2.selectors),
  ...R.mergeLeft(duck1, duck2),
});
