import { Alert, AlertTitle } from "@material-ui/lab";
import React from "react";
const TEST_VIDEO_KEY = "CR5Jp_ag2M8";

export const YoutubeStatusAlertLoading = () => {
  return (
    <Alert severity="warning">
      <AlertTitle>Loading...</AlertTitle>
      Trying to get video from Youtube.
    </Alert>
  );
};

export const YoutubeStatusAlertError = () => {
  return (
    <Alert severity="warning">
      <AlertTitle>Video unavailable</AlertTitle>
      Youtube told me there has been too much video requests. 🙄
    </Alert>
  );
};
