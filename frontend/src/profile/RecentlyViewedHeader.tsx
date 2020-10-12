import { Box, IconButton, Typography } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import HistoryIcon from "@material-ui/icons/History";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ClearRecentlyViewedModal from "./ClearRecentlyViewedModal";
import useBoolean from "../common/hooks/useBoolean";
import { selectors, actions } from "../redux";

export default () => {
  const recentlyViewedEntities = useSelector(selectors.recentlyViewed.entities);
  const dispatch = useDispatch();
  const open = useBoolean();

  const handleClear = () => {
    dispatch(actions.recentlyViewed.clear());
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
        disabled={recentlyViewedEntities.length === 0}
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