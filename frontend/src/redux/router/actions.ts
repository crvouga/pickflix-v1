import { createAction } from "@reduxjs/toolkit";
import { routerActions } from "connected-react-router";
import { ModalName, RouterLocationState, ModalProps } from "./types";

export const open = createAction<{ name: ModalName; props?: ModalProps }>(
  "[router] OPEN"
);

export const close = createAction<{ name: ModalName }>("[router] CLOSE");

export const push = (locationDescription: {
  pathname?: string;
  state?: RouterLocationState;
}) => {
  const action = routerActions.push(locationDescription);
  return action;
};

export const goBack = routerActions.goBack;
