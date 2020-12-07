import {
  AppBar,
  Button,
  useMediaQuery,
  useTheme,
  Box,
  Paper,
} from "@material-ui/core";
import React, { useState } from "react";
import {
  ResponsiveDialog,
  RESPONSIVE_DIALOG_MAX_WIDTH,
} from "../../common/components/ResponsiveDialog";
import useModal from "../../app/modals/useModal";
import SearchTextField from "../../search/input/SearchTextField";
import { DiscoverMovieTag } from "../query/types";
import useDiscoverState from "../useDiscoverState";
import SearchResults from "./SearchResults";
import { AppBarGutter } from "../../common/components/AppBarGutter";
import { SlideUp } from "../../common/components/TransitionComponents";

export default () => {
  const discoverMovieTagSearchModal = useModal("DiscoverSearch");
  const [searchQuery, setSearchQuery] = useState("");
  const discoverLogic = useDiscoverState();

  const handleClick = (tag: DiscoverMovieTag) => {
    discoverMovieTagSearchModal.close();
    discoverLogic.clear();
    discoverLogic.activateTag(tag);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <ResponsiveDialog
      TransitionComponent={SlideUp}
      open={discoverMovieTagSearchModal.isOpen}
      onClose={() => discoverMovieTagSearchModal.close()}
    >
      <Box
        component={Paper}
        zIndex={2}
        position="fixed"
        width="100%"
        maxWidth={RESPONSIVE_DIALOG_MAX_WIDTH}
      >
        <Box display="flex" p={1}>
          <SearchTextField
            placeholder="Search Tags"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {isMobile && (
            <Button
              color="primary"
              size="large"
              onClick={() => discoverMovieTagSearchModal.close()}
            >
              Done
            </Button>
          )}
        </Box>
      </Box>
      <AppBarGutter />
      <SearchResults onClick={handleClick} searchQuery={searchQuery} />
    </ResponsiveDialog>
  );
};
