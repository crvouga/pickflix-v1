import { SnackbarProps } from "@material-ui/core";

export interface SnackbarState {
  snackbarProps: Partial<SnackbarProps>;
  open: boolean;
}
