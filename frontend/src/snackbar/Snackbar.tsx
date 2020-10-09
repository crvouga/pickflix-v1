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
import { List } from "../lists/data";
import { actions, selectors } from "../redux";
import { useHistory } from "react-router";

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
  list: Partial<List>;
};

export const ViewListButton = ({ list }: ViewListButtonProps) => {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <Button
      color="primary"
      size="small"
      onClick={() => {
        dispatch(actions.snackbar.setOpen(false));
        history.push(`/list/${list.id}`);
      }}
      style={{ fontWeight: "bold" }}
    >
      View
    </Button>
  );
};

export const CloseSnackbarButton = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(actions.snackbar.setOpen(false));
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

  const isOpen = useSelector(selectors.snackbar.open);
  const snackbarProps = useSelector(selectors.snackbar.snackbarProps);

  const handleClick = () => {
    dispatch(actions.snackbar.setOpen(false));
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
