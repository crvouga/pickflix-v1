import { AppState } from "../types";
import { ModalName, ModalProps } from "./types";

export const router = (state: AppState) => state.router;

export const pathname = (state: AppState) => router(state).location.pathname;

export const isOpen = (name: ModalName) => (state: AppState) =>
  state.router.location?.state?.[name]?.isOpen || false;

export const props = (name: ModalName) => (state: AppState): ModalProps =>
  state.router.location?.state?.[name]?.props || {};
