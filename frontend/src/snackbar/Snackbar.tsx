import {
  Button,
  IconButton,
  makeStyles,
  Slide,
  Snackbar,
  Theme,
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { snackbar } from "./redux/snackbar";

const Transition = (props: TransitionProps) => (
  <Slide direction="up" {...props} />
);

const useStylesSnackbar = makeStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: 0,
    width: "100%",
    left: 0,
    zIndex: theme.zIndex.appBar - 1,
    bottom: theme.mixins.toolbar.minHeight, //bottom nav bar
    minHeight: theme.spacing(6),
  },
}));

const useStylesSnackbarContent = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    fontWeight: "bold",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
}));

type ViewListButtonProps = {
  listId: string;
};

export const ViewListButton = ({ listId }: ViewListButtonProps) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = () => {
    dispatch(snackbar.actions.setOpen(false));
    history.push(`/list/${listId}`);
  };

  return (
    <Button
      color="primary"
      size="small"
      onClick={handleClick}
      style={{ fontWeight: "bold" }}
    >
      See List
    </Button>
  );
};

export const CloseSnackbarButton = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(snackbar.actions.setOpen(false));
  };

  return (
    <IconButton onClick={handleClick}>
      <CloseIcon />
    </IconButton>
  );
};

export default () => {
  const classesSnackbar = useStylesSnackbar();
  const classesSnackbarContent = useStylesSnackbarContent();

  const dispatch = useDispatch();

  const isOpen = useSelector(snackbar.selectors.open);
  const snackbarProps = useSelector(snackbar.selectors.props);

  const handleClick = () => {
    dispatch(snackbar.actions.setOpen(false));
  };

  return (
    <Snackbar
      onClick={handleClick}
      open={isOpen}
      classes={classesSnackbar}
      TransitionComponent={Transition}
      ContentProps={{
        classes: classesSnackbarContent,
        elevation: 0,
      }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      {...snackbarProps}
      action={
        React.isValidElement(snackbarProps.action)
          ? snackbarProps.action
          : undefined
      }
    />
  );
};
