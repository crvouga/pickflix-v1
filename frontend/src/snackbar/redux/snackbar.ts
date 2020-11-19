import { createAction, createReducer, createSelector } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { AppState } from "../../redux/types";
import { createPayloadReducer } from "../../redux/utils";

const name: "snackbar" = "snackbar";

/*

*/

export type SnackbarProps = {
  message: string;
  action?: React.ReactNode | JSX.Element;
};

export type SnackbarState = {
  props: SnackbarProps;
  isOpen: boolean;
};

/*

*/

const initialState: SnackbarState = {
  props: {
    message: "",
    action: null,
  },
  isOpen: false,
};

/*

*/

const actions = {
  setIsOpen: createAction<boolean>(name + "/SET_IS_OPEN"),
  setProps: createAction<SnackbarProps>(name + "/SET_PROPS"),
  display: createAction<SnackbarProps>(name + "/DISPLAY"),
};

/*

*/

const reducer = createReducer(initialState, {
  [actions.setIsOpen.toString()]: createPayloadReducer("isOpen"),
  [actions.setProps.toString()]: createPayloadReducer("props"),
});

/*

*/

const slice = (state: AppState) => state.snackbar;
const selectors = {
  props: createSelector([slice], (slice) => slice.props),
  isOpen: (state: AppState) => state.snackbar.isOpen,
};

/* 


*/

export const snackbar = {
  actions,
  selectors,
  reducer,
};

/* 


*/

export const useSnackbar = () => {
  const dispatch = useDispatch();
  const actions = bindActionCreators(snackbar.actions, dispatch);
  const props = useSelector(snackbar.selectors.props);
  const isOpen = useSelector(snackbar.selectors.isOpen);
  return {
    props,
    isOpen,
    close: () => actions.setIsOpen(false),
    display: actions.display,
  };
};
