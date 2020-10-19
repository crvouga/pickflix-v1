import { IconButton, IconButtonProps } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import FilterListIcon from "@material-ui/icons/FilterList";
import RedoIcon from "@material-ui/icons/Redo";
import SearchIcon from "@material-ui/icons/Search";
import SortIcon from "@material-ui/icons/Sort";
import TuneIcon from "@material-ui/icons/Tune";
import UndoIcon from "@material-ui/icons/Undo";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import useModal from "../navigation/modals/useModal";
import { discoverActiveTags } from "./redux/discover-active-tags";

export const UndoButton = (props: IconButtonProps) => {
  const canUndo = useSelector(discoverActiveTags.selectors.canUndo);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(discoverActiveTags.actions.undo());
  };
  return (
    <IconButton disabled={!canUndo} onClick={handleClick} {...props}>
      <UndoIcon />
    </IconButton>
  );
};

export const RedoButton = (props: IconButtonProps) => {
  const canRedo = useSelector(discoverActiveTags.selectors.canRedo);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(discoverActiveTags.actions.redo());
  };
  return (
    <IconButton disabled={!canRedo} onClick={handleClick} {...props}>
      <RedoIcon />
    </IconButton>
  );
};

export const ClearButton = (props: IconButtonProps) => {
  const activeTags = useSelector(discoverActiveTags.selectors.activeTags);
  const canClear = activeTags.length > 0;
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(discoverActiveTags.actions.setActiveTags([]));
  };
  return (
    <IconButton disabled={!canClear} onClick={handleClick} {...props}>
      <ClearIcon />
    </IconButton>
  );
};

export const AddButton = (props: IconButtonProps) => {
  const history = useHistory();
  const discoverSearchModal = useModal("DiscoverSearch");
  const handleClick = () => {
    // history.push("/discover/search");
    discoverSearchModal.open();
  };
  return (
    <IconButton onClick={handleClick} {...props}>
      <SearchIcon />
    </IconButton>
  );
};

export const SortButton = (props: IconButtonProps) => {
  const discoverSortModal = useModal("DiscoverSort");
  const handleClick = () => {
    discoverSortModal.open();
  };
  return (
    <IconButton onClick={handleClick} {...props}>
      <SortIcon />
    </IconButton>
  );
};

export const FilterButton = (props: IconButtonProps) => {
  return (
    <IconButton {...props}>
      <FilterListIcon />
    </IconButton>
  );
};

export const TuneButton = (props: IconButtonProps) => {
  const modal = useModal("DiscoverTune");
  const handleClick = () => {
    modal.open();
  };
  return (
    <IconButton onClick={handleClick} {...props}>
      <TuneIcon />
    </IconButton>
  );
};
