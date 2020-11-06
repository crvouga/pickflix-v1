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
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import ResponsiveDialog from "../common/components/ResponsiveDialog";
import { closeDialog } from "../utils";
import { useAuth } from "../auth/useAuth";

export default (props: DialogProps) => {
  const auth = useAuth();
  const handleClickSignOut = async () => {
    await auth.signOut();
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Dialog fullScreen={isMobile} {...props}>
      <Hidden smUp>
        <AppBar color="default" position="sticky">
          <Toolbar>
            <IconButton onClick={() => closeDialog(props)} edge="start">
              <CloseIcon />
            </IconButton>
            <Box flex={1}>
              <Typography variant="h6">Options</Typography>
            </Box>
          </Toolbar>
        </AppBar>
      </Hidden>
      <Box minWidth="360px">
        <ButtonGroup fullWidth orientation="vertical" size="large">
          <Button onClick={handleClickSignOut}>Sign Out</Button>
          <Button onClick={() => closeDialog(props)}>Cancel</Button>
        </ButtonGroup>
      </Box>
    </Dialog>
  );
};
