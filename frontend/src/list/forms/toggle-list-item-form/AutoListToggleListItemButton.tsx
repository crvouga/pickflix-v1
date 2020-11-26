import React from "react";
import { useSnackbar } from "../../../app/snackbar/redux/snackbar";
import { LinkButton } from "../../../app/snackbar/Snackbar";
import LabeledIconButton from "../../../common/components/LabeledIconButton";
import { MediaId } from "../../../media/tmdb/types";
import { useListener } from "../../../common/utility";
import AutoListIcon from "../../auto-lists/AutoListIcon";
import { AutoListKeys, toAutoListName } from "../../query";
import { useQueryAutoLists } from "../../query/hooks";
import useToggleListItemMutation from "./useToggleListItemMutation";

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

  const { mutate, isAdded, status, eventEmitter } = useToggleListItemMutation({
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
      icon={<AutoListIcon autoListKey={autoListKey} filled={isAdded} />}
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
