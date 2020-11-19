import {
  Dialog,
  DialogProps,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React from "react";

const useStylesDialog = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.up("sm")]: {
      marginTop: "60px",
      marginBottom: "auto",
      minHeight: "360px",
      // maxHeight: "480px",
      width: "480px",
      zIndex: theme.zIndex.snackbar - 1,
    },
  },
}));

export default (props: DialogProps) => {
  const classesDialog = useStylesDialog();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  return <Dialog classes={classesDialog} fullScreen={isMobile} {...props} />;
};
