import React from "react";
import AccountModal from "../../auth/AccountModal";
import AddListFormModal from "../../lists/AddListFormModal";
import AddListItemFormModal from "../../lists/AddListItemFormModal";
import ReviewFormModal from "../../reviews/form/ReviewFormModal";
import SearchModal from "../../search/SearchDialog";
import { useQueryCurrentUser } from "../../users/useCurrentUser";
import DeleteReviewFormModal from "../../reviews/form/DeleteReviewFormModal";

export default () => {
  const query = useQueryCurrentUser();
  return (
    <React.Fragment>
      {!query.error && query.data && (
        <AddListItemFormModal currentUser={query.data} />
      )}
      <AddListFormModal />
      <SearchModal />
      <AccountModal />
      <DeleteReviewFormModal />
      <ReviewFormModal />
    </React.Fragment>
  );
};
