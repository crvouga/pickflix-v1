import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import root from "./root";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, root.reducer);
const sagaMiddleware = createSagaMiddleware();

export default () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: [sagaMiddleware],
  });
  sagaMiddleware.run(root.saga);
  const persistor = persistStore(store);

  return { store, persistor };
};
