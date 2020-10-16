import { AppState } from "../../../redux/types";

export const step = (state: AppState) => state.authForm.step;
export const values = (state: AppState) => state.authForm.values;
export const error = (state: AppState) => state.authForm.error;
export const status = (state: AppState) => state.authForm.status;
