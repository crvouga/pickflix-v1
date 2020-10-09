import { createAction } from "@reduxjs/toolkit";
export const setTrue = createAction<string>("[boolean] SET_TRUE");
export const setFalse = createAction<string>("[boolean] SET_TRUE");
export const toggle = createAction<string>("[boolean] SET_TRUE");
