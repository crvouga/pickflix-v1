import React from "react";
import AccountModal from "../../auth/AccountModal";
import AddListFormModal from "../../lists/AddListFormModal";
import AddListItemFormModal from "../../lists/AddListItemFormModal";
import ReviewFormModal from "../../reviews/form/ReviewFormModal";
import SearchModal from "../../search/SearchDialog";
import useCurrentUser from "../../users/useCurrentUser";

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
