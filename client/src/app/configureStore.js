import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import player from "../video/redux/player";
import modal from "../common/redux/modal";

const rootReducer = {
  player: player.reducer,
  modal: modal.reducer,
};

export default () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware()],
  });
  return store;
};
