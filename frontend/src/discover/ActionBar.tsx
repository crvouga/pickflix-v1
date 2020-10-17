import {
  AppBar,
  Box,
  IconButton,
  IconButtonProps,
  Toolbar,
  Divider,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import RedoIcon from "@material-ui/icons/Redo";
import UndoIcon from "@material-ui/icons/Undo";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountButton from "../navigation/AccountButton";
import SearchButton from "../navigation/SearchButton";
import AddIcon from "@material-ui/icons/Add";
import { discoverParams } from "./redux/discover-params";
import useModal from "../navigation/modals/useModal";
import { useHistory } from "react-router";

export const APP_BAR_HEIGHT = "56px";

const UndoButton = (props: IconButtonProps) => {
  const canUndo = useSelector(discoverParams.selectors.canUndo);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(discoverParams.actions.undo());
  };
  return (
    <IconButton disabled={!canUndo} onClick={handleClick} {...props}>
      <UndoIcon />
    </IconButton>
  );
};

const RedoButton = (props: IconButtonProps) => {
  const canRedo = useSelector(discoverParams.selectors.canRedo);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(discoverParams.actions.redo());
  };
  return (
    <IconButton disabled={!canRedo} onClick={handleClick} {...props}>
      <RedoIcon />
    </IconButton>
  );
};

const ClearButton = (props: IconButtonProps) => {
  const activeTags = useSelector(discoverParams.selectors.activeTags);
  const canClear = activeTags.length > 0;
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(discoverParams.actions.setActiveTags([]));
  };
  return (
    <IconButton disabled={!canClear} onClick={handleClick} {...props}>
      <ClearIcon />
    </IconButton>
  );
};

const AddButton = (props: IconButtonProps) => {
  const discoverMovieTuneModal = useModal("DiscoverMovieTune");
  const handleClick = () => {
    discoverMovieTuneModal.open();
  };
  return (
    <IconButton onClick={handleClick} {...props}>
      <AddIcon />
    </IconButton>
  );
};

export default () => {
  return (
    <Toolbar variant="dense">
      <AddButton edge="start" />
      <UndoButton />
      <RedoButton />
      <ClearButton />
    </Toolbar>
  );
};
