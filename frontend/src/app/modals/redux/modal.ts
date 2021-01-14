import {
  createAction,
  createReducer,
  createSelector,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AppState } from "../../redux/types";
import { Modals } from "../types";

const name: "modal" = "modal";

/*

*/

export type IsOpenByName = Partial<{ [name in keyof Modals]: boolean }>;
export type PropsByName<K extends keyof Modals> = Partial<
  {
    [name in K]: Modals[K];
  }
>;
export type ModalState = {
  isOpenByName: IsOpenByName;
  propsByName: PropsByName<keyof Modals>;
};

/*

*/

const initialState: ModalState = {
  isOpenByName: {},
  propsByName: {},
};

/*

*/

type OpenPayload<K extends keyof Modals> = {
  name: K;
  props: Modals[K];
};

type ClosePayload<K extends keyof Modals> = K;

const actions = {
  open: createAction(
    name + "/OPEN",
    <K extends keyof Modals>(name: K, props: Modals[K]) => {
      const payload: OpenPayload<K> = {
        name,
        props,
      };
      return {
        payload,
      };
    }
  ),
  close: createAction<ClosePayload<keyof Modals>>(name + "/CLOSE"),
};

/*

*/

const reducer = createReducer(initialState, {
  [actions.open.toString()]: (
    state,
    action: PayloadAction<OpenPayload<keyof Modals>>
  ) => {
    state.isOpenByName[action.payload.name] = true;
    state.propsByName[action.payload.name] = action.payload.props;
  },
  [actions.close.toString()]: (state, action: PayloadAction<keyof Modals>) => {
    state.isOpenByName[action.payload] = false;
  },
});

/*

*/

const slice = (state: AppState) => state.modal;
const isOpenByName = createSelector([slice], (slice) => slice.isOpenByName);
const propsByName = createSelector([slice], (slice) => slice.propsByName);
const selectors = {
  slice,
  isOpenByName,
  propsByName,
  isOpen: (name: keyof Modals) => (state: AppState) =>
    isOpenByName(state)[name] || false,
  props: (name: keyof Modals) => (state: AppState) => propsByName(state)[name],
};

/* 


*/

export const modal = {
  actions,
  selectors,
  reducer,
};
