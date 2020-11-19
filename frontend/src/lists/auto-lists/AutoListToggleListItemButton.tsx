import { Button, CircularProgress, Box } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import LabeledIconButton from "../../common/components/LabeledIconButton";
import { useSnackbar } from "../../snackbar/redux/snackbar";
import { MediaId } from "../../tmdb/types";
import { AutoListKeys, toAutoListName } from "../query";
import { useQueryAutoLists } from "../query/hooks";
import useToggleListItemMutation from "../forms/toggle-list-item-form/useToggleListItemMutation";
import AutoListIcon from "./AutoListIcon";
import { useListener } from "../../utils";
import { LinkButton } from "../../snackbar/Snackbar";

const ToggleAutoListButton = ({
  listId,
  mediaId,
  autoListKey,
}: {
  listId: string;
  mediaId: MediaId;
  autoListKey: AutoListKeys;
}) => {
  const snackbar = useSnackbar();

  const { mutate, status, eventEmitter } = useToggleListItemMutation({
    mediaId,
    listId,
  });

  useListener(eventEmitter, "added", () => {
    snackbar.display({
      message: `Added to ${toAutoListName(autoListKey)}`,
      action: <LinkButton path={`/auto-list/${listId}`} />,
    });
  });

  useListener(eventEmitter, "removed", () => {
    snackbar.display({
      message: `Removed from ${toAutoListName(autoListKey)}`,
    });
  });

  return (
    <LabeledIconButton
      label={toAutoListName(autoListKey)}
      onClick={() => {
        mutate();
      }}
      icon={
        status === "loading" ? (
          <Box color="action.active">
            <CircularProgress color="inherit" disableShrink size="1.8em" />
          </Box>
        ) : (
          <AutoListIcon autoListKey={autoListKey} filled={status === "added"} />
        )
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
  const query = useQueryAutoLists({});
  const autoList = query.data
    ? query.data.find((list) => list.list.key === autoListKey)
    : undefined;

  const listId = autoList?.list.id;

  if (!listId) {
    return (
      <LabeledIconButton
        label={toAutoListName(autoListKey)}
        icon={<AutoListIcon autoListKey={autoListKey} />}
      />
    );
  }

  return (
    <ToggleAutoListButton
      listId={listId}
      mediaId={mediaId}
      autoListKey={autoListKey}
    />
  );
};
