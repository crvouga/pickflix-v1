import reduceReducers from "reduce-reducers";
import { createAction, createReducer } from "@reduxjs/toolkit";
import * as R from "ramda";

/* reduce redux boilerplate by creating getter selectors, setter actions, and setter reducer 
  createDocumentDuck("counter", { count: 0 }) ===
  {
    name: "counter",
    types: {
      setCount: namespace + "/" + setCount,
    },
    reducer: (state, action) => {
      if (action.type === types.setCount) {
        return action.payload;
      }
      return state;
    },
    actions: {
      setCount: (payload) => ({ type: "name/setCount", payload }),
    },
    selectors: {
      count: (state) => state[name].count,
    },
    saga: function* () {},
  };
*/

const capitialize = R.pipe(
  R.juxt([R.pipe(R.take(1), R.toUpper), R.drop(1)]),
  R.join("")
);

export const createDocumentDuck = ({ path, initialState }) => {
  const keyToSelector = (key) => R.path([name, key]);
  const keyToActionName = (key) => `set${capitialize(key)}`;
  const keyToActionType = (key) => `${name}/${keyToActionName(key)}`;
  const keyToReducer = (key) => (state, action) =>
    R.assoc(key, action.payload, state);

  const keys = R.keys(initialState);
  const types = R.pipe(R.keys, (key) => `set${capitialize(key)}`)(initialState);
  const namedTypes = R.map((type) => R.join("/", R.append(type, path)), types);
  const actions = R.map(createAction, types);
  const selectors = R.map(createSelector, path);

  const actions = R.pipe(
    R.keys,
    R.map(R.juxt([keyToActionName, R.pipe(keyToActionType, createAction)])),
    R.fromPairs
  )(initialState);

  const selectors = R.pipe(
    R.keys,
    R.map(R.juxt([R.identity, keyToSelector])),
    R.fromPairs
  )(initialState);

  const reducer = R.pipe(
    R.keys,
    R.map(R.juxt([keyToActionType, keyToReducer])),
    R.fromPairs,
    R.curry(createReducer)(initialState)
  )(initialState);

  return {
    name,
    reducer,
    actions,
    selectors,
  };
};
