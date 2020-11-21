import { PayloadAction } from "@reduxjs/toolkit";

export const createPayloadReducer = <S, K extends keyof S>(key: K) => (
  state: S,
  action: PayloadAction<S[K]>
): S => {
  return {
    ...state,
    [key]: action.payload,
  };
};
