import {
  Button,
  ButtonProps,
  IconButton,
  makeStyles,
  Slide,
  Snackbar,
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { useHistory } from "react-router";
import { APP_BAR_HEIGHT } from "../navigation/constants";
import { useSnackbar } from "./redux/snackbar";
import { SNACKBAR_TRANSITION_DURATION } from "./redux/snackbar-saga";

const Transition = (props: TransitionProps) => (
  <Slide direction="up" {...props} />
);

const useStylesSnackbar = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("xs")]: {
      zIndex: theme.zIndex.appBar - 1,
      bottom: theme.mixins.toolbar.minHeight, //bottom nav bar
    },
  },
}));

const useStylesSnackbarContent = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    fontWeight: "bold",

    transform: `translateY(-${APP_BAR_HEIGHT}px)`,
  },
}));

export const LinkButton = ({
  path,
  label = "View",
  ...props
}: {
  path: string;
  label?: string;
} & ButtonProps) => {
  const snackbar = useSnackbar();
  const history = useHistory();

  const handleClick = () => {
    snackbar.close();
    history.push(path);
  };

  return (
    <Button
      color="primary"
      size="small"
      onClick={handleClick}
      style={{ fontWeight: "bold" }}
      {...props}
    >
      {label}
    </Button>
  );
};

export const CloseSnackbarButton = () => {
  const snackbar = useSnackbar();

  const handleClick = () => {
    snackbar.close();
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
  const snackbar = useSnackbar();

  const handleClick = () => {
    snackbar.close();
  };

  return (
    <Snackbar
      onClick={handleClick}
      open={snackbar.isOpen}
      classes={classesSnackbar}
      TransitionComponent={Transition}
      ContentProps={{
        classes: classesSnackbarContent,
        elevation: 0,
      }}
      transitionDuration={SNACKBAR_TRANSITION_DURATION}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      {...snackbar.props}
      action={
        React.isValidElement(snackbar.props.action)
          ? snackbar.props.action
          : undefined
      }
    />
  );
};
