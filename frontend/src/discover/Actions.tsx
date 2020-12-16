import { IconButton, IconButtonProps } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import FilterListIcon from "@material-ui/icons/FilterList";
import FolderOpenOutlinedIcon from "@material-ui/icons/FolderOpenOutlined";
import RedoIcon from "@material-ui/icons/Redo";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import SearchIcon from "@material-ui/icons/Search";
import SortIcon from "@material-ui/icons/Sort";
import TuneIcon from "@material-ui/icons/Tune";
import UndoIcon from "@material-ui/icons/Undo";
import React from "react";
import useModal from "../app/modals/useModal";
import useDiscoverState from "./redux/useDiscoverState";
import WithAuthentication from "../user/auth/WithAuthentication";
import { useSaveDiscoverTagsMutation } from "./form/save-discover-tags-form/SaveDiscoverTagsFormModal";

export const SaveButton = (props: IconButtonProps) => {
  const { activeTags } = useDiscoverState();
  const { submit } = useSaveDiscoverTagsMutation();
  const signInCallToAction = useModal("SignInCallToAction");
  return (
    <WithAuthentication
      renderAuthenticated={(currentUser) => (
        <IconButton
          disabled={activeTags.length === 0}
          onClick={() => {
            submit();
          }}
          {...props}
        >
          <SaveOutlinedIcon />
        </IconButton>
      )}
      renderUnathenticated={() => (
        <IconButton
          onClick={() => {
            signInCallToAction.open();
          }}
          {...props}
        >
          <SaveOutlinedIcon />
        </IconButton>
      )}
      renderDefault={() => (
        <IconButton disabled {...props}>
          <SaveOutlinedIcon />
        </IconButton>
      )}
    ></WithAuthentication>
  );
};

export const FolderButton = (props: IconButtonProps) => {
  const { open } = useModal("DiscoverTagsForm");
  return (
    <IconButton
      onClick={() => {
        open();
      }}
      {...props}
    >
      <FolderOpenOutlinedIcon />
    </IconButton>
  );
};

export const UndoButton = (props: IconButtonProps) => {
  const { activeTagState } = useDiscoverState();
  return (
    <IconButton
      disabled={activeTagState.past.length === 0}
      onClick={() => {
        activeTagState.undo();
      }}
      {...props}
    >
      <UndoIcon />
    </IconButton>
  );
};

export const RedoButton = (props: IconButtonProps) => {
  const { activeTagState } = useDiscoverState();
  return (
    <IconButton
      disabled={activeTagState.future.length === 0}
      onClick={() => {
        activeTagState.redo();
      }}
      {...props}
    >
      <RedoIcon />
    </IconButton>
  );
};

export const ClearButton = (props: IconButtonProps) => {
  const { activeTags, setActiveTagsById } = useDiscoverState();
  return (
    <IconButton
      disabled={activeTags.length === 0}
      onClick={() => {
        setActiveTagsById({});
      }}
      {...props}
    >
      <ClearIcon />
    </IconButton>
  );
};

export const AddButton = (props: IconButtonProps) => {
  const { open } = useModal("DiscoverSearch");

  return (
    <IconButton
      onClick={() => {
        open();
      }}
      {...props}
    >
      <SearchIcon />
    </IconButton>
  );
};

export const SortButton = (props: IconButtonProps) => {
  const { open } = useModal("DiscoverSort");

  return (
    <IconButton
      onClick={() => {
        open();
      }}
      {...props}
    >
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
