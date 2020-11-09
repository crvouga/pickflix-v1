import { CircularProgress } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import LabeledIconButton from "../../common/components/LabeledIconButton";
import LoadingBox from "../../common/components/LoadingBox";
import { TmdbMedia } from "../../tmdb/types";
import {
  AutoListKeys,
  getAutoLists,
  queryKeys,
  toAutoListName,
} from "../query";
import useListItemToggleState from "../useListItemToggleState";
import AutoListIcon from "./AutoListIcon";
import useSnackbar from "../../snackbar/useSnackbar";

const AutoListToggleListItemButton = ({
  autoListKey,
  tmdbMediaType,
  tmdbMediaId,
  listId,
}: TmdbMedia & { listId: string; autoListKey: AutoListKeys }) => {
  const snackbar = useSnackbar();
  const toggleState = useListItemToggleState({
    tmdbMediaType,
    tmdbMediaId,
    listId,
  });

  const handleClick = async () => {
    try {
      const isIn = await toggleState.toggle();
      if (isIn) {
        snackbar.display({
          message: `Added to ${toAutoListName(autoListKey)}`,
        });
      } else {
        snackbar.display({
          message: `Removed from ${toAutoListName(autoListKey)}`,
        });
      }
    } catch (error) {}
  };

  return (
    <LabeledIconButton
      label={toAutoListName(autoListKey)}
      onClick={handleClick}
      icon={
        toggleState.isLoading ? (
          <CircularProgress color="inherit" size="1.9em" />
        ) : (
          <AutoListIcon autoListKey={autoListKey} filled={toggleState.isIn} />
        )
      }
    />
  );
};

export default (props: TmdbMedia & { autoListKey: AutoListKeys }) => {
  const query = useQuery(queryKeys.autoLists(), () => getAutoLists());
  if (query.error) {
    return null;
  }
  if (!query.data) {
    return null;
  }

  const autoList = query.data.find(
    (list) => list.list.key === props.autoListKey
  );

  if (!autoList) {
    throw new Error("liked list does not exists");
  }
  return <AutoListToggleListItemButton listId={autoList.list.id} {...props} />;
};
