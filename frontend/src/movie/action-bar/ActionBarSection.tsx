import { Box } from "@material-ui/core";
import React from "react";
import useModal from "../../app/modals/useModal";
import {
  AutoListToggleButtonActions,
  AutoListToggleButtonActionsContainer,
  ToggleFormModalButton,
  ToggleFormModalButtonContainer,
} from "../../list/forms/toggle-form/buttons";
import { MediaId } from "../../media/tmdb/types";
import WithAuthentication from "../../user/auth/WithAuthentication";

export default ({ mediaId }: { mediaId: MediaId }) => {
  const { open } = useModal("SignInCallToAction");

  return (
    <Box display="flex" justifyContent="space-between" flexWrap="nowrap">
      <WithAuthentication
        renderAuthenticated={() => (
          <React.Fragment>
            <AutoListToggleButtonActionsContainer mediaId={mediaId} />
            <ToggleFormModalButtonContainer mediaId={mediaId} />
          </React.Fragment>
        )}
        renderUnathenticated={() => (
          <React.Fragment>
            <AutoListToggleButtonActions onClick={open} />
            <ToggleFormModalButton onClick={open} />
          </React.Fragment>
        )}
        renderDefault={() => (
          <React.Fragment>
            <AutoListToggleButtonActions />
            <ToggleFormModalButton />
          </React.Fragment>
        )}
      />
    </Box>
  );
};
