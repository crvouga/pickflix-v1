import { Box } from "@material-ui/core";
import React from "react";
import AutoListToggleListItemButton from "../../lists/forms/toggle-list-item-form/AutoListToggleListItemButton";
import OpenToggleListItemFormButton from "../../lists/forms/toggle-list-item-form/OpenToggleListItemFormButton";
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
      <OpenToggleListItemFormButton mediaId={mediaId} />
      {/* <AddListItemButton mediaId={mediaId} /> */}
    </Box>
  );
};
