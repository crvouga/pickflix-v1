import React from "react";
import ErrorDialog from "../auth/ErrorDialog";
import CreateListDialog from "../lists/CreateListDialog";
import SaveToListDialog from "../lists/SaveToListDialog";

export default () => {
  return (
    <React.Fragment>
      <ErrorDialog />
      <SaveToListDialog />
      <CreateListDialog />
    </React.Fragment>
  );
};
