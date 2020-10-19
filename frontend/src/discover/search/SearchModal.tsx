import { Dialog, fade, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import useModal from "../../navigation/modals/useModal";
import { DiscoverMovieTag } from "../query/types";
import useDiscoverLogic from "../useDiscoverLogic";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

const useStylesDialog = makeStyles((theme) => ({
  paper: {
    backgroundColor: fade(theme.palette.background.default, 0.9),
  },
}));

export default () => {
  const classesDialog = useStylesDialog();
  const discoverMovieTagSearchModal = useModal("DiscoverSearch");
  const [searchQuery, setSearchQuery] = useState("");
  const discoverLogic = useDiscoverLogic();

  const handleClick = (tag: DiscoverMovieTag) => {
    discoverMovieTagSearchModal.close();
    discoverLogic.clear();
    discoverLogic.activateTag(tag);
  };

  return (
    <Dialog
      fullScreen
      classes={classesDialog}
      open={discoverMovieTagSearchModal.isOpen}
      scroll="body"
    >
      <SearchBar onChange={setSearchQuery} />
      <SearchResults onClick={handleClick} searchQuery={searchQuery} />
    </Dialog>
  );
};
