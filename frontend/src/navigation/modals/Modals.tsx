import React from "react";
import AddListFormModal from "../../lists/AddListFormModal";
import AddListItemFormModal from "../../lists/AddListItemFormModal";

export default () => {
  return (
    <React.Fragment>
      <AddListItemFormModal />
      <AddListFormModal />
    </React.Fragment>
  );
};
