import React from "react";
import ErrorDialog from "../../auth/ErrorDialog";
import CreateListDialog from "../../lists/AddListModal";
import AddListItemModal from "../../lists/AddListItemModal";

export default () => {
  return (
    <React.Fragment>
      <ErrorDialog />
      <AddListItemModal />
      <CreateListDialog />
    </React.Fragment>
  );
};
