import { SnackbarProps } from "@material-ui/core";
import { createAction } from "@reduxjs/toolkit";
import { DeepPartial } from "../../utils";

export const setOpen = createAction<boolean>("[snackbar] SET_OPEN");

export const setSnackbarProps = createAction<DeepPartial<SnackbarProps>>(
  "[snackbar] SET_SNACKBAR_PROPS"
);

export const display = createAction<DeepPartial<SnackbarProps>>(
  "[snackbar] DISPLAY"
);
