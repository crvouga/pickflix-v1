import { configureStore } from "@reduxjs/toolkit";
import localforage from "localforage";
import { persistReducer, persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import { configureRoot } from "./index";

const { reducer, saga } = configureRoot();

const persistConfig = {
  key: "root",
  storage: localforage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const sagaMiddleware = createSagaMiddleware();

export default () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: [sagaMiddleware],
  });

  sagaMiddleware.run(saga);

  const persistor = persistStore(store);

  return {
    store,
    persistor,
  };
};
