import { Box, IconButton, Typography } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import HistoryIcon from "@material-ui/icons/History";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useBoolean from "../common/hooks/useBoolean";
import { history } from "../navigation/history/history";
import ClearRecentlyViewedModal from "./ClearRecentlyViewedModal";

export default () => {
  const entities = useSelector(history.selectors.entities);
  const dispatch = useDispatch();
  const open = useBoolean();

  const handleClear = () => {
    dispatch(history.actions.clear());
    open.setFalse();
  };

  return (
    <Box display="flex" paddingX={1} color="text.secondary">
      <Box p={1} flex={1}>
        <Typography>
          <HistoryIcon style={{ marginBottom: "-0.30em" }} /> Recently Viewed
        </Typography>
      </Box>
      <IconButton
        color="inherit"
        onClick={open.setTrue}
        disabled={entities.length === 0}
      >
        <DeleteForeverIcon color="inherit" />
      </IconButton>
      <ClearRecentlyViewedModal
        DialogProps={{ open: open.value, onClose: open.setFalse }}
        onClear={handleClear}
      />
    </Box>
  );
};
