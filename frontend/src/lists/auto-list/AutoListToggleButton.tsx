import React from "react";
import LabeledIconButton from "../../common/components/LabeledIconButton";
import { TmdbMediaType } from "../../tmdb/types";
import { AutoListKey } from "../types";
import useDoesListInclude from "../useDoesListInclude";
import AutoListIcon from "./AutoListIcon";
import useAutoList from "./useAutoListLogic";

type Props = {
  autoListKey: AutoListKey;
  tmdbMediaId: string;
  tmdbMediaType: TmdbMediaType;
};

export default ({ autoListKey, tmdbMediaId, tmdbMediaType }: Props) => {
  const autoList = useAutoList(autoListKey);
  const doesListInclude = useDoesListInclude({ tmdbMediaId, tmdbMediaType });

  const isItemIncludeInList = doesListInclude(autoList.query.data?.id || "");

  const disabled = autoList.status !== "success";

  const handleClick = async () => {
    if (autoList.status === "success") {
      if (isItemIncludeInList) {
        await autoList.add({ tmdbMediaId, tmdbMediaType });
      } else {
        await autoList.remove({ tmdbMediaId, tmdbMediaType });
      }
    }
  };

  return (
    <LabeledIconButton
      disabled={disabled}
      label={autoListKey}
      onClick={handleClick}
    >
      <AutoListIcon
        autoListKey={autoListKey}
        filled={!disabled && Boolean(isItemIncludeInList)}
      />
    </LabeledIconButton>
  );
};
