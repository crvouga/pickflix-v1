import { configureStore } from "@reduxjs/toolkit";
import localforage from "localforage";
import { persistReducer, persistStore, PersistConfig } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import { rootReducer } from "./root-reducer";
import { rootSaga } from "./root-saga";

const persistConfig = {
  key: "root",
  storage: localforage,
};

export const configureReduxStore = () => {
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: persistedReducer,
    middleware: [sagaMiddleware],
  });

  sagaMiddleware.run(rootSaga);

  const persistor = persistStore(store);

  return {
    store,
    persistor,
  };
};
