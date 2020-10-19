import { Dialog, fade, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useModal from "../../navigation/modals/useModal";
import { DiscoverMovieTag } from "../query/types";
import { discoverActiveTags } from "../redux/discover-active-tags";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

const useStylesDialog = makeStyles((theme) => ({
  paper: {
    backgroundColor: fade(theme.palette.background.default, 0.9),
  },
}));

export default () => {
  const dispatch = useDispatch();
  const classesDialog = useStylesDialog();
  const discoverMovieTagSearchModal = useModal("DiscoverSearch");
  const [searchQuery, setSearchQuery] = useState("");

  const handleClick = (tag: DiscoverMovieTag) => {
    discoverMovieTagSearchModal.close();
    dispatch(discoverActiveTags.actions.setActiveTags([tag]));
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
