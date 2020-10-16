import {
  AppBar,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  makeStyles,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import AccountBoxOutlinedIcon from "@material-ui/icons/AccountBoxOutlined";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import WarningIcon from "@material-ui/icons/Warning";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import useBoolean from "../common/hooks/useBoolean";
import BackButton from "../navigation/BackButton";
import { auth } from "./redux/auth";

const useStyles = makeStyles((theme) => ({
  bold: {
    fontWeight: "bold",
  },
  signInButton: {
    color: theme.palette.text.primary,

    fontWeight: "bold",
  },
  backgroundColorWhite: {
    backgroundColor: "white",
  },
  warning: {
    color: theme.palette.warning.main,
  },
  danger: {
    color: theme.palette.error.main,
  },
}));

const ConfirmSignOutDialog = (props: {
  isOpen: boolean;
  close: () => void;
  onSignOut: () => void;
}) => {
  const { isOpen, close, onSignOut } = props;
  return (
    <Dialog
      open={isOpen}
      onClose={close}
      PaperProps={{ style: { width: "80%" } }}
    >
      <DialogTitle>Sign out?</DialogTitle>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button onClick={onSignOut}>Sign out</Button>
      </DialogActions>
    </Dialog>
  );
};

const DELETE_ACCOUNT_CONFORMATION_TEXT = "DELETE";

const ConfirmDeleteAccountDialog = (props: {
  isOpen: boolean;
  close: () => void;
  onDeleteAccount: () => void;
}) => {
  const { isOpen, close, onDeleteAccount } = props;
  const classes = useStyles();
  const [value, setValue] = useState("");
  const handleChange = (e: React.ChangeEvent<{ value: string }>) => {
    setValue(e.target.value);
  };
  return (
    <Dialog
      open={isOpen}
      onClose={close}
      PaperProps={{ style: { width: "80%" } }}
    >
      <DialogTitle className={classes.danger}>Delete Account</DialogTitle>

      <ListItem>
        <ListItemIcon>
          <WarningIcon className={classes.danger} />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ className: classes.danger }}
          primary="This will destroy all your data!"
        />
      </ListItem>

      <Box paddingX={2}>
        <TextField
          fullWidth
          variant="outlined"
          label={`Type ${DELETE_ACCOUNT_CONFORMATION_TEXT} to confirm`}
          onChange={handleChange}
          value={value}
        />
      </Box>

      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button
          className={classes.danger}
          disabled={DELETE_ACCOUNT_CONFORMATION_TEXT !== value}
          onClick={onDeleteAccount}
        >
          Delete Account
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default () => {
  const currentUser = useSelector(auth.selectors.user);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const onSignIn = () => {
    history.push("/signIn");
  };

  const isSignOutDialogOpen = useBoolean(false);
  const onSignOut = () => {
    dispatch(auth.actions.signOut());
    history.push("/");
  };

  const isDeleteAccountDialogOpen = useBoolean(false);
  const onDeleteAccount = () => {
    dispatch(auth.actions.deleteUser());
    history.push("/");
  };

  return (
    <React.Fragment>
      <AppBar color="default" position="sticky">
        <Toolbar>
          <BackButton />
          <Typography variant="h6" className={classes.bold}>
            Account
          </Typography>
        </Toolbar>
      </AppBar>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar
              className={classes.backgroundColorWhite}
              src={currentUser?.photoURL || undefined}
            />
          </ListItemAvatar>
          <ListItemText
            primary={currentUser?.displayName}
            secondary={currentUser?.email}
          />
        </ListItem>
        <ListItem button onClick={onSignIn}>
          <ListItemIcon>
            <AccountBoxOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Sign in to different account" />
        </ListItem>

        <ListItem button onClick={isSignOutDialogOpen.setTrue}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </ListItem>
        <ConfirmSignOutDialog
          isOpen={isSignOutDialogOpen.value}
          close={isSignOutDialogOpen.setFalse}
          onSignOut={onSignOut}
        />

        <ListItem button onClick={isDeleteAccountDialogOpen.setTrue}>
          <ListItemIcon>
            <DeleteForeverOutlinedIcon className={classes.danger} />
          </ListItemIcon>
          <ListItemText
            secondaryTypographyProps={{ className: classes.danger }}
            primaryTypographyProps={{ className: classes.danger }}
            primary="Delete Account"
          />
        </ListItem>
        <ConfirmDeleteAccountDialog
          isOpen={isDeleteAccountDialogOpen.value}
          close={isDeleteAccountDialogOpen.setFalse}
          onDeleteAccount={onDeleteAccount}
        />
      </List>
    </React.Fragment>
  );
};
