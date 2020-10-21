import React from "react";
import ErrorDialog from "../../auth/ErrorDialog";
import AddListFormModal from "../../lists/AddListFormModal";
import AddListItemFormModal from "../../lists/AddListItemFormModal";

export default () => {
  return (
    <React.Fragment>
      <ErrorDialog />
      <AddListItemFormModal />
      <AddListFormModal />
    </React.Fragment>
  );
};
