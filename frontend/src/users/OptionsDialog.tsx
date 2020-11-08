import {
  AppBar,
  Box,
  DialogProps,
  IconButton,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemText,
  Hidden,
  Dialog,
  useMediaQuery,
  useTheme,
  ButtonGroup,
  Button,
  makeStyles,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import ResponsiveDialog from "../common/components/ResponsiveDialog";
import { closeDialog } from "../utils";
import { useAuth } from "../auth/useAuth";

const useStylesDialog = makeStyles((theme) => ({
  paper: {
    width: "80%",
    maxWidth: "360px",
  },
}));

export default (props: DialogProps) => {
  const classesDialog = useStylesDialog();
  const auth = useAuth();
  const handleClickSignOut = async () => {
    await auth.signOut();
  };

  return (
    <Dialog classes={classesDialog} {...props}>
      <ButtonGroup variant="text" fullWidth orientation="vertical" size="large">
        <Button onClick={handleClickSignOut}>Sign Out</Button>
        <Button onClick={() => closeDialog(props)}>Cancel</Button>
      </ButtonGroup>
    </Dialog>
  );
};
