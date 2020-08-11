import { Box, Fab, useTheme } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import { useDispatch } from "react-redux";
import discover from "./redux";
import Results from "./Results";
import Tags from "./Tags";
import SearchTagsModal from "./SearchTagsModal";

export default () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    dispatch(discover.actions.setOpen(true));
  };

  return (
    <div>
      <Box position="sticky" top={0} zIndex={theme.zIndex.appBar}>
        <Tags />
      </Box>
      <Results />
      <SearchTagsModal />
      <Box position="fixed" bottom="64px" right="12px">
        <Fab onClick={handleClickOpen} color="primary">
          <AddIcon color="action" />
        </Fab>
      </Box>
    </div>
  );
};
