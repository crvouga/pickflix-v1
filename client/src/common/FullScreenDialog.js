import {
  AppBar,
  Dialog,
  IconButton,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";

export default ({ children, open, onClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={onClose}>
      {fullScreen && (
        <AppBar color="transparent" position="sticky">
          <Toolbar>
            <IconButton edge="start" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}
      {children}
    </Dialog>
  );
};
