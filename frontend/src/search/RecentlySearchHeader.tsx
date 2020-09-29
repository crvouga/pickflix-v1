import { Box, IconButton, Typography } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import HistoryIcon from "@material-ui/icons/History";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useBoolean from "../common/hooks/useBoolean";
import ClearRecentlySearchedModal from "./ClearRecentlySearchedModal";
import search from "./redux";

export default () => {
  const open = useBoolean();
  const recentlySearched = useSelector(search.selectors.recentlySearched);
  const dispatch = useDispatch();
  const handleClear = () => {
    open.setFalse();
    dispatch(search.actions.setRecentlySearched([]));
  };

  return (
    <Box display="flex" color="text.secondary" paddingX={1}>
      <Box flex={1} p={1}>
        <Typography>
          <HistoryIcon style={{ marginBottom: "-0.3em" }} /> Recently Searched
        </Typography>
      </Box>
      <IconButton
        onClick={open.setTrue}
        disabled={recentlySearched.length === 0}
        color="inherit"
      >
        <DeleteForeverIcon />
      </IconButton>
      <ClearRecentlySearchedModal
        DialogProps={{ open: open.value, onClose: open.setFalse }}
        onClear={handleClear}
      />
    </Box>
  );
};
