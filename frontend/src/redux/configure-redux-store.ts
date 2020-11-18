import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import { persistConfig } from "./redux-persist-config";
import { rootReducer } from "./root-reducer";
import { rootSaga } from "./root-saga";

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
