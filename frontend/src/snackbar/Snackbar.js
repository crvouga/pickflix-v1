import {
  Button,
  IconButton,
  makeStyles,
  Slide,
  Snackbar,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import * as R from "ramda";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../redux";

const TransitionUp = React.forwardRef((props, ref) => (
  <Slide {...props} direction="up" ref={ref} />
));

const useStylesSnackbar = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: 0,
    width: "100%",
    left: 0,
    zIndex: theme.zIndex.appBar - 1,
    bottom: theme.mixins.toolbar.minHeight, //bottom nav bar
  },
}));

const useStylesSnackbarContent = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    fontWeight: "bold",
  },
}));

export const SnackbarNames = {
  AddToListSuccess: "AddToListSuccess",
};

export default () => {
  const classesSnackbar = useStylesSnackbar();
  const classesSnackbarContent = useStylesSnackbarContent();

  const isOpen = useSelector(selectors.snackbar.isOpen);
  const info = useSelector(selectors.snackbar.info);

  const dispatch = useDispatch();

  const onClose = (e) => {
    console.log({ e });
    dispatch(actions.snackbar.setIsOpen(false));
  };

  const CloseButton = () => (
    <IconButton onClick={onClose}>
      <CloseIcon />
    </IconButton>
  );

  const baseProps = {
    TransitionComponent: TransitionUp,
    classes: classesSnackbar,
    ContentProps: {
      elevation: 0,
      variant: "outlined",
      classes: classesSnackbarContent,
    },
    open: isOpen,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "center",
    },
  };

  const propsByName = {
    [SnackbarNames.AddToListSuccess]: {
      message: `Added to ${info?.list.title}`,
      action: (
        <React.Fragment>
          <Button
            color="primary"
            size="small"
            onClick={() => {
              onClose();
              dispatch(actions.router.push(`/list/${info?.list.id}`));
            }}
            style={{ fontWeight: "bold" }}
          >
            View
          </Button>
          <CloseButton />
        </React.Fragment>
      ),
    },
  };

  const props = R.mergeDeepRight(
    baseProps,
    R.pathOr({}, [info?.name], propsByName)
  );

  return <Snackbar {...props} />;
};
