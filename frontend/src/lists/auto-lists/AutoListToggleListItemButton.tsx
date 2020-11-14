import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router";
import LabeledIconButton from "../../common/components/LabeledIconButton";
import useSnackbar from "../../snackbar/useSnackbar";
import { MediaId } from "../../tmdb/types";
import {
  AutoListKeys,
  getAutoLists,
  queryKeys,
  toAutoListName,
} from "../query";
import useListItemToggleState from "../useListItemToggleState";
import AutoListIcon from "./AutoListIcon";

const SeeListButton = ({ listId }: { listId: string }) => {
  const history = useHistory();
  return (
    <Button
      color="primary"
      onClick={() => {
        if (listId) {
          history.push(`/auto-list/${listId}`);
        }
      }}
    >
      See List
    </Button>
  );
};

const Sub = ({
  listId,
  mediaId,
  autoListKey,
}: {
  listId: string;
  mediaId: MediaId;
  autoListKey: AutoListKeys;
}) => {
  const snackbar = useSnackbar();

  const listItemState = useListItemToggleState({
    mediaId,
    listId,
  });

  const handleClick = () => {
    listItemState.toggle();
  };

  useEffect(() => {
    const unlistens = [
      listItemState.events.on("removed", () => {
        snackbar.display({
          message: `Removed from ${toAutoListName(autoListKey)}`,
        });
      }),
      listItemState.events.on("added", () => {
        snackbar.display({
          message: `Added to ${toAutoListName(autoListKey)}`,
          action: <SeeListButton listId={listId} />,
        });
      }),
    ];
    return () => {
      unlistens.forEach((unlisten) => unlisten());
    };
  }, []);

  return (
    <LabeledIconButton
      label={toAutoListName(autoListKey)}
      onClick={handleClick}
      icon={
        <AutoListIcon
          autoListKey={autoListKey}
          filled={listItemState.isAdded}
        />
      }
    />
  );
};

export default ({
  mediaId,
  autoListKey,
}: {
  mediaId: MediaId;
  autoListKey: AutoListKeys;
}) => {
  const query = useQuery(queryKeys.autoLists(), () => getAutoLists());
  const autoList = query.data
    ? query.data.find((list) => list.list.key === autoListKey)
    : undefined;

  const listId = autoList?.list.id;

  if (!listId) {
    return null;
  }

  return <Sub listId={listId} mediaId={mediaId} autoListKey={autoListKey} />;
};
