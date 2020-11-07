import React from "react";
import AddListFormModal from "../../lists/AddListFormModal";
import AddListItemFormModal from "../../lists/AddListItemFormModal";
import SearchModal from "../../search/SearchDialog";
import AccountModal from "../../auth/AccountModal";
import ReviewFormModal from "../../reviews/ReviewFormModal";
import { useCurrentUser } from "../../auth/useAuth";

export default () => {
  const currentUser = useCurrentUser();
  return (
    <React.Fragment>
      {currentUser !== "loading" && currentUser !== null && (
        <AddListItemFormModal currentUser={currentUser} />
      )}
      <AddListFormModal />
      <SearchModal />
      <AccountModal />
      <ReviewFormModal />
    </React.Fragment>
  );
};
