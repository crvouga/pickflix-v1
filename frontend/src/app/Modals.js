import React from "react";
import ErrorDialog from "../auth/ErrorDialog";
import SaveToListDialog from "../lists/SaveToListDialog";
import CreateListDialog from "../lists/CreateListDialog";
import VideoDialog from "../video/VideoDialog";

const modalNames = {
  Error: "Error",
  Video: "Video",
  AddToList: "AddToList",
  CreateList: "CreateList",
};

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
