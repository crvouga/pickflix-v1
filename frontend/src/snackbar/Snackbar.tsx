import {
  Button,
  IconButton,
  makeStyles,
  Snackbar,
  Theme,
  Slide,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IList } from "../lists/redux/entities";
import { actions, selectors } from "../redux";
import { TransitionProps } from "@material-ui/core/transitions";

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

interface IViewListButtonProps {
  list: Partial<IList>;
}
export const ViewListButton: React.FC<IViewListButtonProps> = ({ list }) => {
  const dispatch = useDispatch();

  return (
    <Button
      color="primary"
      size="small"
      onClick={() => {
        dispatch(actions.snackbar.setOpen(false));
        dispatch(actions.router.push({ pathname: `/list/${list.id}` }));
      }}
      style={{ fontWeight: "bold" }}
    >
      View
    </Button>
  );
};

export const CloseSnackbarButton = () => {
  const dispatch = useDispatch();

  return (
    <IconButton
      onClick={() => {
        dispatch(actions.snackbar.setOpen(false));
      }}
    >
      <CloseIcon />
    </IconButton>
  );
};

export default () => {
  const classesSnackbar = useStylesSnackbar();
  const classesSnackbarContent = useStylesSnackbarContent();

  const isOpen = useSelector(selectors.snackbar.open);
  const snackbarProps = useSelector(selectors.snackbar.snackbarProps);

  return (
    <Snackbar
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
    />
  );
};
