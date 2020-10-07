import { configureStore } from "@reduxjs/toolkit";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { persistReducer, persistStore } from "redux-persist";
import localforage from "localforage";

import createSagaMiddleware from "redux-saga";
import { configureRoot } from "./index";
import query from "./query";

const history = createBrowserHistory();

const root = configureRoot(history);

const persistConfig = {
  key: "root",
  storage: localforage,
};

const persistedReducer = persistReducer(persistConfig, root.reducer);

const sagaMiddleware = createSagaMiddleware();

const middleware = [
  routerMiddleware(history),
  sagaMiddleware,
  ...query.middlewares,
];

export default () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware,
  });

  sagaMiddleware.run(root.saga);

  const persistor = persistStore(store);

  return {
    store,
    persistor,
    history,
  };
};
