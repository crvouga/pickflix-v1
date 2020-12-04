import { Button, useMediaQuery, useTheme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { ResponsiveDialog } from "../common/components/ResponsiveDialog";
import useModal from "../app/modals/useModal";
import SearchBar from "./input/SearchBar";
import SearchResults from "./results/SearchResults";

const CloseButton = () => {
  const searchModal = useModal("Search");
  return (
    <Button size="large" onClick={searchModal.close} color="primary">
      Done
    </Button>
  );
};

export default () => {
  const searchModal = useModal("Search");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const [text, setText] = useState("");

  useEffect(() => {
    setText("");
  }, [searchModal.isOpen]);

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
