import { Dialog, Box, useTheme } from "@material-ui/core";
import React from "react";
import NavigationBarTopLevel, {
  APP_BAR_HEIGHT,
} from "../navigation/NavigationBarTopLevel";
import DiscoverMovieResults from "./DiscoverMovieResults";
import DiscoverMovieTags from "./DiscoverMovieTags";
import useModal from "../navigation/modals/useModal";
import DiscoverMovieTagSearchModal from "./DiscoverMovieTagSearchModal";

export default () => {
  const theme = useTheme();
  return (
    <React.Fragment>
      <NavigationBarTopLevel />
      <Box position="sticky" top={APP_BAR_HEIGHT} zIndex={theme.zIndex.appBar}>
        <DiscoverMovieTags />
      </Box>
      <DiscoverMovieResults />
      <DiscoverMovieTagSearchModal />
    </React.Fragment>
  );
};
