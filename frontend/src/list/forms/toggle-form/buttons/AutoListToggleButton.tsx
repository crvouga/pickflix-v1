import { ButtonBaseProps } from "@material-ui/core";
import React from "react";
import LabeledIconButton from "../../../../common/components/LabeledIconButton";
import { MediaId } from "../../../../media/tmdb/types";
import AutoListIcon from "../../../auto-lists/AutoListIcon";
import {
  AutoListKeys,
  toAutoListName,
  useQueryAutoLists,
} from "../../../query";
import { useToggleFormState } from "../toggle-form";

export const AutoListToggleButton = ({
  checked,
  autoListKey,
  ...props
}: {
  checked?: boolean;
  autoListKey: AutoListKeys;
} & ButtonBaseProps) => {
  return (
    <LabeledIconButton
      label={toAutoListName(autoListKey)}
      icon={<AutoListIcon autoListKey={autoListKey} filled={checked} />}
      {...props}
    />
  );
};

export const AutoListToggleButtonActions = ({
  onClick,
}: {
  onClick?: () => void;
}) => {
  return (
    <React.Fragment>
      <AutoListToggleButton
        onClick={onClick}
        autoListKey={AutoListKeys.Liked}
      />
      <AutoListToggleButton
        onClick={onClick}
        autoListKey={AutoListKeys.WatchNext}
      />
    </React.Fragment>
  );
};

export const AutoListToggleButtonContainer = ({
  listId,
  mediaId,
  checked,
  autoListKey,
  ...props
}: {
  listId: string;
  mediaId: MediaId;
  checked?: boolean;
  autoListKey: AutoListKeys;
} & ButtonBaseProps) => {
  const { listIds, toggle } = useToggleFormState();
  return (
    <LabeledIconButton
      label={toAutoListName(autoListKey)}
      icon={
        <AutoListIcon autoListKey={autoListKey} filled={listId in listIds} />
      }
      onClick={() => {
        toggle({ listId, mediaId });
      }}
      {...props}
    />
  );
};

export const AutoListToggleButtonActionsContainer = ({
  mediaId,
}: {
  mediaId: MediaId;
}) => {
  const query = useQueryAutoLists({
    includeListItemWithMediaId: mediaId,
  });

  if (query.error) {
    return null;
  }

  if (!query.data) {
    return <AutoListToggleButtonActions />;
  }

  const liked = query.data.find((_) => _.list.key === AutoListKeys.Liked);
  const watchNext = query.data.find(
    (_) => _.list.key === AutoListKeys.WatchNext
  );

  if (!liked || !watchNext) {
    return <AutoListToggleButtonActions />;
  }

  return (
    <React.Fragment>
      <AutoListToggleButtonContainer
        listId={liked.list.id}
        mediaId={mediaId}
        autoListKey={AutoListKeys.Liked}
        checked={Boolean(liked.includeListItemWithMediaId)}
      />
      <AutoListToggleButtonContainer
        listId={watchNext.list.id}
        mediaId={mediaId}
        autoListKey={AutoListKeys.WatchNext}
        checked={Boolean(watchNext.includeListItemWithMediaId)}
      />
    </React.Fragment>
  );
};
