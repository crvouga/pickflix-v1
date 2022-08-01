import { Container, Box } from "@material-ui/core";
import React from "react";
import { ToggleListItemActionBarContainer } from "../../list/forms/toggle-form/ToggleListItemActionBar";
import { MediaId } from "../../media/tmdb/types";

export default ({ mediaId }: { mediaId: MediaId }) => {
  return (
    <Container maxWidth="sm">
      <Box display="flex" justifyContent="space-between" flexWrap="nowrap">
        <ToggleListItemActionBarContainer mediaId={mediaId} />
      </Box>
    </Container>
  );
};
