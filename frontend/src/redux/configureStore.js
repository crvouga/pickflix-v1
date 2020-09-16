import { configureStore } from "@reduxjs/toolkit";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import { configureRoot } from "./index";
import query from "./query";
import idTokenMiddleware from "./id-token-middleware";
const history = createBrowserHistory();

const root = configureRoot(history);

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, root.reducer);

const sagaMiddleware = createSagaMiddleware();
const middleware = [
  sagaMiddleware,
  routerMiddleware(history),
  idTokenMiddleware,
  query.middleware,
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
