import { SnackbarProps } from "@material-ui/core";
import { createAction } from "@reduxjs/toolkit";

export const setOpen = createAction<boolean>("[snackbar] SET_OPEN");
export const setSnackbarProps = createAction<Partial<SnackbarProps>>(
  "[snackbar] SET_SNACKBAR_PROPS"
);

export const display = createAction<Partial<SnackbarProps>>(
  "[snackbar] DISPLAY"
);
