import { Dialog, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useModal from "../../navigation/modals/useModal";
import { DiscoverMovieTag } from "../discover-movie-tags";
import { discoverMovie } from "../redux/discover-movie";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

const useStylesDialog = makeStyles((theme) => ({
  paper: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
}));

export default () => {
  const dispatch = useDispatch();
  const classesDialog = useStylesDialog();
  const discoverMovieTagSearchModal = useModal("DiscoverMovieTune");
  const [searchQuery, setSearchQuery] = useState("");

  const handleClick = (tag: DiscoverMovieTag) => {
    discoverMovieTagSearchModal.close();
    dispatch(discoverMovie.actions.setActiveTags([tag]));
  };

  return (
    <Dialog
      fullScreen
      classes={classesDialog}
      open={discoverMovieTagSearchModal.isOpen}
    >
      <SearchBar onChange={setSearchQuery} />
      <SearchResults onClick={handleClick} searchQuery={searchQuery} />
    </Dialog>
  );
};
