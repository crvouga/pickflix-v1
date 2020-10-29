import React from "react";
import AddListFormModal from "../../lists/AddListFormModal";
import AddListItemFormModal from "../../lists/AddListItemFormModal";
import SearchModal from "../../search/SearchDialog";
import AccountModal from "../../auth/AccountModal";

export default () => {
  return (
    <React.Fragment>
      <AddListItemFormModal />
      <AddListFormModal />
      <SearchModal />
      <AccountModal />
    </React.Fragment>
  );
};
