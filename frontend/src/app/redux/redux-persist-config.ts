import localforage from "localforage";
import { PersistConfig } from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { AppState } from "./types";

const blacklist: (keyof AppState)[] = ["reviewVoteStates"];

export const persistConfig: PersistConfig<AppState> = {
  key: "root",
  storage: localforage,

  //EXPLANATION: https://medium.com/frontend-development-with-js/when-modify-redux-store-how-to-fix-redux-persist-confliction-613cefac7d9a
  stateReconciler: autoMergeLevel2,
  blacklist,
};
