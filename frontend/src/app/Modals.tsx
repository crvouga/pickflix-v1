import React from "react";
import ErrorDialog from "../auth/ErrorDialog";
import CreateListDialog from "../lists/CreateListDialog";
import SaveToListDialog from "../lists/SaveToListDialog";
import VideoDialog from "../video/VideoDialog";

export default () => {
  return (
    <React.Fragment>
      <ErrorDialog />
      <VideoDialog />
      <SaveToListDialog />
      <CreateListDialog />
    </React.Fragment>
  );
};
