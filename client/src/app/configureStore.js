import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import player from "../video/redux/player";
import modal from "../common/redux/modal";
import search from "../search/redux/search";

const rootReducer = {
  player: player.reducer,
  modal: modal.reducer,
  search: search.reducer,
};

export default () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware()],
  });
  return store;
};
