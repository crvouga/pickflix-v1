import { Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import LabeledIconButton from "../../common/components/LabeledIconButton";
import { useSnackbar } from "../../snackbar/redux/snackbar";
import { MediaId } from "../../tmdb/types";
import { AutoListKeys, toAutoListName } from "../query";
import { useQueryAutoLists } from "../query/hooks";
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
    onRemoved: () => {
      snackbar.display({
        message: `Removed from ${toAutoListName(autoListKey)}`,
      });
    },
    onAdded: () => {
      snackbar.display({
        message: `Added to ${toAutoListName(autoListKey)}`,
        action: <SeeListButton listId={listId} />,
      });
    },
  });

  return (
    <LabeledIconButton
      label={toAutoListName(autoListKey)}
      onClick={() => {
        listItemState.toggle();
      }}
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

  return <Sub listId={listId} mediaId={mediaId} autoListKey={autoListKey} />;
};
