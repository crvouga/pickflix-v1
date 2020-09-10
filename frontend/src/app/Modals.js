import React from "react";
import ErrorDialog from "../auth/ErrorDialog";
import AddToListDialog from "../list/AddToListDialog";
import CreateListDialog from "../list/CreateListDialog";
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
      <AddToListDialog />
      <CreateListDialog />
    </React.Fragment>
  );
};
