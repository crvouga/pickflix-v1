import { Dialog, makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectors, actions } from "../redux";
import SearchTagsInput from "./SearchInput";
import SearchTagsResults from "./SearchResults";
import { ModalName } from "../redux/router/types";
import { useHistory } from "react-router";

const useStylesDialog = makeStyles((theme) => ({
  paper: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // theme.palette.background.default,
  },
}));

export default () => {
  const classesDialog = useStylesDialog();
  const history = useHistory();
  const open = false;

  const dispatch = useDispatch();
  const handleClose = () => {};
  return (
    <Dialog
      classes={classesDialog}
      fullScreen
      open={open}
      onClose={handleClose}
    >
      <SearchTagsInput />
      <SearchTagsResults />
    </Dialog>
  );
};