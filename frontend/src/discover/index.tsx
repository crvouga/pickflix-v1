import { Box, Fab, useTheme } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import NavigationBarTopLevel from "../navigation/NavigationBarTopLevel";
import DiscoverResults from "./DiscoverResults";
import DiscoverTags from "./DiscoverTags";
import SearchModal from "./SearchModal";

export default () => {
  const theme = useTheme();

  const handleClickOpen = () => {};

  return (
    <React.Fragment>
      <NavigationBarTopLevel />
      <Box position="sticky" top={56} zIndex={theme.zIndex.appBar}>
        <DiscoverTags />
      </Box>
      <DiscoverResults />
      <SearchModal />
      <Box position="fixed" bottom="64px" right="12px">
        <Fab onClick={handleClickOpen} color="primary">
          <SearchIcon color="action" />
        </Fab>
      </Box>
    </React.Fragment>
  );
};
