import React from "react";
import AddListItemFormModal from "../../lists/forms/add-list-item-form/AddListItemFormModal";
import CreateListFormModal from "../../lists/forms/create-list-form/CreateListFormModal";
import DeleteListFormModal from "../../lists/forms/delete-list-form/DeleteListFormModal";
import EditListFormModal from "../../lists/forms/edit-list-form/EditListFormModal";
import DeleteListItemFormModal from "../../lists/forms/remove-list-items-form/RemoveListItemFormModal";
import ToggleListItemFormModal from "../../lists/forms/toggle-list-item-form/ToggleListItemFormModal";
import DeleteReviewFormModal from "../../reviews/form/delete-review/DeleteReviewFormModal";
import ReviewFormModal from "../../reviews/form/review-form/ReviewFormModal";
import SearchModal from "../../search/SearchDialog";
import { useQueryCurrentUser } from "../../users/query/hooks";

export default () => {
  const query = useQueryCurrentUser();
  return (
    <React.Fragment>
      {!query.error && query.data && (
        <AddListItemFormModal currentUser={query.data} />
      )}
      <ToggleListItemFormModal />
      <EditListFormModal />
      <CreateListFormModal />
      <DeleteListFormModal />
      <DeleteListItemFormModal />
      <DeleteReviewFormModal />
      <ReviewFormModal />

      <SearchModal />
    </React.Fragment>
  );
};
