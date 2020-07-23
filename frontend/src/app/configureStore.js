import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import configureRoot from "./configureRoot";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";

const history = createBrowserHistory();

const root = configureRoot(history);

const persistConfig = {
  key: "root",
  storage,
};
const reducer = persistReducer(persistConfig, root.reducer);

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, routerMiddleware(history)];

export default () => {
  const store = configureStore({
    reducer,
    middleware,
  });
  sagaMiddleware.run(root.saga);
  const persistor = persistStore(store);
  return { store, persistor, history };
};
