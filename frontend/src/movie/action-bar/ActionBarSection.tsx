import { Box } from "@material-ui/core";
import React from "react";
import AutoListToggleListItemButton, {
  AutoListButton,
} from "../../list/forms/toggle-list-item-form/AutoListToggleListItemButton";
import OpenToggleListItemFormButton, {
  ListsButton,
} from "../../list/forms/toggle-list-item-form/OpenToggleListItemFormButton";
import { AutoListKeys } from "../../list/query";
import { MediaId } from "../../media/tmdb/types";
import WithAuthentication from "../../user/auth/WithAuthentication";
import useModal from "../../app/modals/useModal";

export default ({ mediaId }: { mediaId: MediaId }) => {
  const { open } = useModal("SignInCallToAction");

  return (
    <Box display="flex" justifyContent="space-between" flexWrap="nowrap">
      <WithAuthentication
        renderAuthenticated={() => (
          <React.Fragment>
            <AutoListToggleListItemButton
              autoListKey={AutoListKeys.Liked}
              mediaId={mediaId}
            />
            <AutoListToggleListItemButton
              autoListKey={AutoListKeys.WatchNext}
              mediaId={mediaId}
            />
            <OpenToggleListItemFormButton mediaId={mediaId} />
          </React.Fragment>
        )}
        renderDefault={() => (
          <React.Fragment>
            <AutoListButton autoListKey={AutoListKeys.Liked} onClick={open} />
            <AutoListButton
              autoListKey={AutoListKeys.WatchNext}
              onClick={open}
            />
            <ListsButton onClick={open} />
          </React.Fragment>
        )}
      />
    </Box>
  );
};
