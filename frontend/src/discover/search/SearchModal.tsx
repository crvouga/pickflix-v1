import {
  AppBar,
  Button,
  useMediaQuery,
  useTheme,
  Box,
} from "@material-ui/core";
import React, { useState } from "react";
import { ResponsiveDialog } from "../../common/components/ResponsiveDialog";
import useModal from "../../app/modals/useModal";
import SearchTextField from "../../search/input/SearchTextField";
import { DiscoverMovieTag } from "../query/types";
import useDiscoverState from "../useDiscoverState";
import SearchResults from "./SearchResults";

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
      open={discoverMovieTagSearchModal.isOpen}
      onClose={() => discoverMovieTagSearchModal.close()}
    >
      <AppBar color="default" position="sticky">
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
      </AppBar>
      <SearchResults onClick={handleClick} searchQuery={searchQuery} />
    </ResponsiveDialog>
  );
};
