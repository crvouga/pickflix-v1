import { IconButton, Box, Typography } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import HistoryIcon from "@material-ui/icons/History";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useBoolean from "../common/hooks/useBoolean";
import ClearHistoryModal from "./ClearHistoryModal";
import search from "./redux";
import ResultGrid from "./ResultGrid";

export default () => {
  const open = useBoolean();
  const history = useSelector(search.selectors.history);

  const dispatch = useDispatch();
  const handleClear = () => {
    open.setFalse();
    dispatch(search.actions.setHistory([]));
  };

  return (
    <div>
      <ClearHistoryModal
        DialogProps={{ open: open.value, onClose: open.setFalse }}
        onClear={handleClear}
      />
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        color={history.length === 0 ? "textSeconday" : "textPrimary"}
        p={2}
      >
        <Box
          display="flex"
          flexDirection="columns"
          alignItems="center"
          color="inherit"
        >
          <Typography color="inherit">
            <HistoryIcon style={{ marginBottom: "-0.25em" }} /> Recently
            Searched
          </Typography>
        </Box>
        <IconButton
          onClick={open.setTrue}
          disabled={history.length === 0}
          color="inherit"
        >
          <DeleteForeverIcon />
        </IconButton>
      </Box>
      <ResultGrid results={history} />
    </div>
  );
};
