import { createAction, createReducer, createSelector } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { AppState } from "../../redux/types";
import { createPayloadReducer } from "../../redux/utils";
import { ModalName } from "../types";
import { removeKey } from "../../../common/utility";

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
};

/*

*/

const reducer = createReducer(initialState, {
  [actions.setIsOpenByName.toString()]: createPayloadReducer("isOpenByName"),
});

/*

*/

const slice = (state: AppState) => state.modal;
const selectors = {
  slice,
  isOpenByName: createSelector([slice], (slice) => slice.isOpenByName),
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

export const useModalState = () => {
  const dispatch = useDispatch();
  const actions = bindActionCreators(modal.actions, dispatch);
  const slice = useSelector(modal.selectors.slice);
  const { isOpenByName } = slice;
  const { setIsOpenByName } = actions;

  const open = (modalName: ModalName) => {
    setIsOpenByName({
      ...isOpenByName,
      [modalName]: true,
    });
  };

  const close = (modalName: ModalName) => {
    setIsOpenByName({
      ...isOpenByName,
      [modalName]: false,
    });
  };

  const isOpen = (modalName: ModalName) => {
    return isOpenByName[modalName] ?? false;
  };

  return {
    open,
    close,
    isOpen,
  };
};
