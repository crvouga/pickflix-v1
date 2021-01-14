import { useMediaQuery, useTheme } from "@material-ui/core";
import React from "react";
import useModal from "../app/modals/useModal";
import { ResponsiveDialog } from "../common/components/ResponsiveDialog";
import SearchBar from "./input/SearchBar";
import SearchResults from "./results/SearchResults";

export default () => {
  const searchModal = useModal("Search");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <ResponsiveDialog
      fullScreen={isMobile}
      open={searchModal.isOpen}
      onClose={searchModal.close}
      transitionDuration={0}
    >
      <SearchBar />
      <SearchResults />
    </ResponsiveDialog>
  );
};
