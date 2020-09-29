import { AppState } from "../../../redux/types";

export const step = (state: AppState) => state.signInForm.step;
export const values = (state: AppState) => state.signInForm.values;
export const error = (state: AppState) => state.signInForm.error;
export const status = (state: AppState) => state.signInForm.status;
