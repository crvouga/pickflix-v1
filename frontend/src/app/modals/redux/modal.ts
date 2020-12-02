import {
  createAction,
  createReducer,
  createSelector,
  PayloadAction,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/types";
import { createPayloadReducer } from "../../redux/utils";
import { IModal, ModalName } from "../types";

const name: "modal" = "modal";

/*

*/

export type IsOpenByName = Partial<{ [name in ModalName]: boolean }>;

export type ModalState = {
  isOpenByName: IsOpenByName;
};

/*

*/

const initialState: ModalState = {
  isOpenByName: {},
};

/*

*/

const actions = {
  setIsOpenByName: createAction<IsOpenByName>(name + "/SET_IS_OPEN_BY_NAME"),
  open: createAction<ModalName>(name + "/OPEN"),
  close: createAction<ModalName>(name + "/CLOSE"),
};

/*

*/

const reducer = createReducer(initialState, {
  [actions.setIsOpenByName.toString()]: createPayloadReducer("isOpenByName"),
  [actions.open.toString()]: (state, action: PayloadAction<ModalName>) => {
    state.isOpenByName[action.payload] = true;
  },
  [actions.close.toString()]: (state, action: PayloadAction<ModalName>) => {
    state.isOpenByName[action.payload] = false;
  },
});

/*

*/

const slice = (state: AppState) => state.modal;
const isOpenByName = createSelector([slice], (slice) => slice.isOpenByName);
const selectors = {
  slice,
  isOpenByName,
  isOpen: (name: ModalName) => (state: AppState) =>
    isOpenByName(state)[name] || false,
};

/* 


*/

export const modal = {
  actions,
  selectors,
  reducer,
};

/* 


*/

export const useModalRedux = (name: ModalName): IModal => {
  const dispatch = useDispatch();
  const isOpen = useSelector(modal.selectors.isOpen(name));
  const open = () => {
    dispatch(modal.actions.open(name));
  };
  const close = () => {
    dispatch(modal.actions.close(name));
  };

  return {
    open,
    close,
    isOpen,
  };
};
