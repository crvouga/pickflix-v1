import { Dialog, makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import discover from "./redux";
import SearchTagsInput from "./SearchTagsInput";
import SearchTagsResults from "./SearchTagsResults";
import { useRef } from "react";
import { useEffect } from "react";

const useStylesDialog = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.default, //"rgba(0, 0, 0, 0.5)",
  },
}));

export default () => {
  const classesDialog = useStylesDialog();
  const open = useSelector(discover.selectors.open);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(discover.actions.setOpen(false));
  };
  const paperRef = useRef();

  useEffect(() => {
    if (open && paperRef.current) {
      paperRef.current.scrollTop = 0;
    }
  }, [open, paperRef.current]);
  return (
    <Dialog
      classes={classesDialog}
      fullScreen
      open={open}
      onClose={handleClose}
      PaperProps={{ ref: paperRef }}
    >
      <SearchTagsInput />
      <SearchTagsResults />
    </Dialog>
  );
};
