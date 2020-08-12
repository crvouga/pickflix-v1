import { Box, Fab, useTheme } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import { useDispatch } from "react-redux";
import modal from "../common/redux/modal";
import DiscoverResults from "./DiscoverResults";
import SearchModal from "./SearchModal";
import DiscoverTags from "./DiscoverTags";

export default () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    dispatch(modal.actions.open("discover/SearchModal"));
  };

  return (
    <div>
      <Box position="sticky" top={0} zIndex={theme.zIndex.appBar}>
        <DiscoverTags />
      </Box>
      <DiscoverResults />
      <SearchModal />
      <Box position="fixed" bottom="64px" right="12px">
        <Fab onClick={handleClickOpen} color="primary">
          <AddIcon color="action" />
        </Fab>
      </Box>
    </div>
  );
};
