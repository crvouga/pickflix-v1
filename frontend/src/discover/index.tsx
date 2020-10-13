import { Box, useTheme } from "@material-ui/core";
import React from "react";
import NavigationBarTopLevel, {
  APP_BAR_HEIGHT,
} from "../navigation/NavigationBarTopLevel";
import DiscoverResults from "./DiscoverResults";
import DiscoverTags from "./DiscoverTags";

export default () => {
  const theme = useTheme();

  return (
    <React.Fragment>
      <NavigationBarTopLevel />
      <Box position="sticky" top={APP_BAR_HEIGHT} zIndex={theme.zIndex.appBar}>
        <DiscoverTags />
      </Box>
      <DiscoverResults />
    </React.Fragment>
  );
};
