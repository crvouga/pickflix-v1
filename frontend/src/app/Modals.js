import React from "react";
import ErrorDialog from "../auth/ErrorDialog";
import AddToListDialog from "../lists/AddToListDialog";
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
      <AddToListDialog />
      <CreateListDialog />
    </React.Fragment>
  );
};
