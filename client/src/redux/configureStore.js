import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistCombineReducers, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import root from "./root";

const persistConfig = {
  key: "root",
  storage,
};

const sagaMiddleware = createSagaMiddleware();

export default () => {
  const persistedReducer = persistCombineReducers(persistConfig, root.reducer);
  const store = configureStore({
    reducer: persistedReducer,
    middleware: [sagaMiddleware],
  });
  sagaMiddleware.run(root.saga);
  const persistor = persistStore(store);

  return { store, persistor };
};
