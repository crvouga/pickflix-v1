import { Box } from "@material-ui/core";
import React from "react";
import AutoListToggleListItemButton from "../../lists/auto-lists/AutoListToggleListItemButton";
import AddListItemButton from "../../lists/forms/add-list-item-form/AddListItemButton";
import { AutoListKeys } from "../../lists/query";
import { MediaId } from "../../tmdb/types";

export default ({ mediaId }: { mediaId: MediaId }) => {
  return (
    <Box display="flex" justifyContent="space-between" flexWrap="nowrap">
      <AutoListToggleListItemButton
        autoListKey={AutoListKeys.Liked}
        mediaId={mediaId}
      />
      <AutoListToggleListItemButton
        autoListKey={AutoListKeys.WatchNext}
        mediaId={mediaId}
      />
      <AddListItemButton mediaId={mediaId} />
    </Box>
  );
};
