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
  <Slide {...props} direction="up" timeout={1000 / 5} ref={ref} />
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
  EditListSuccess: "EditListSuccess",
};

const ViewListButton = ({ list }) => {
  const dispatch = useDispatch();

  return (
    <Button
      color="primary"
      size="small"
      onClick={() => {
        dispatch(actions.snackbar.setIsOpen(false));
        dispatch(actions.router.push(`/list/${list?.id}`));
      }}
      style={{ fontWeight: "bold" }}
    >
      View
    </Button>
  );
};

const CloseButton = () => {
  const dispatch = useDispatch();

  return (
    <IconButton
      onClick={() => {
        dispatch(actions.snackbar.setIsOpen(false));
      }}
    >
      <CloseIcon />
    </IconButton>
  );
};

export default () => {
  const classesSnackbar = useStylesSnackbar();
  const classesSnackbarContent = useStylesSnackbarContent();

  const isOpen = useSelector(selectors.snackbar.isOpen);
  const info = useSelector(selectors.snackbar.info);

  const SnacknarPropsByName = {
    [SnackbarNames.AddToListSuccess]: {
      message: `Added to ${info?.list?.title}`,
      action: (
        <React.Fragment>
          <ViewListButton />
          <CloseButton />
        </React.Fragment>
      ),
    },
    [SnackbarNames.EditListSuccess]: {
      message: `Saved changes`,
      action: <CloseButton />,
    },
  };

  const SnackbarProps = {
    TransitionComponent: TransitionUp,
    classes: classesSnackbar,
    ContentProps: {
      classes: classesSnackbarContent,
      // FYI: <Paper /> props works here
      elevation: 0,
    },
    open: isOpen,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "center",
    },
  };

  const props = R.mergeDeepRight(
    SnackbarProps,
    R.propOr({}, R.propOr({}, "name", info), SnacknarPropsByName)
  );

  return <Snackbar {...props} />;
};
