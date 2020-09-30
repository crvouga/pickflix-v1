import { configureStore } from "@reduxjs/toolkit";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import { configureRoot } from "./index";
import query from "./query";

const history = createBrowserHistory();

const root = configureRoot(history);

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
    blacklist: ["auth"],
  },
  root.reducer
);

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
