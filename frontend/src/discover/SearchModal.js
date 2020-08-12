import { Dialog, makeStyles } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import modal from "../common/redux/modal";
import SearchTagsInput from "./SearchInput";
import SearchTagsResults from "./SearchResults";

const useStylesDialog = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.default, //"rgba(0, 0, 0, 0.5)",
  },
}));

export default () => {
  const classesDialog = useStylesDialog();
  const open = useSelector(modal.selectors.isOpen("discover/SearchModal"));
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(modal.actions.close("discover/SearchModal"));
  };
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
