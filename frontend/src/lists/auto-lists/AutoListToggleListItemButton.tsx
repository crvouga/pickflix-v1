import { Button, CircularProgress } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router";
import LabeledIconButton from "../../common/components/LabeledIconButton";
import useSnackbar from "../../snackbar/useSnackbar";
import { TmdbMedia } from "../../tmdb/types";
import {
  AutoListKeys,
  getAutoLists,
  queryKeys,
  toAutoListName,
} from "../query";
import useListItemToggleState from "../useListItemToggleState";
import AutoListIcon from "./AutoListIcon";

const AutoListToggleListItemButton = ({
  autoListKey,
  tmdbMediaType,
  tmdbMediaId,
  listId,
}: TmdbMedia & { listId: string; autoListKey: AutoListKeys }) => {
  const snackbar = useSnackbar();
  const history = useHistory();
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
          action: (
            <Button
              color="primary"
              onClick={() => {
                history.push(`/auto-list/${listId}`);
              }}
            >
              See List
            </Button>
          ),
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
