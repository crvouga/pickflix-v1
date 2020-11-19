import React from "react";
import AuthPopups from "../../auth/AuthPopups";
import CreateListFormModal from "../../lists/forms/create-list-form/CreateListFormModal";
import DeleteListFormModal from "../../lists/forms/delete-list-form/DeleteListFormModal";
import EditListFormModal from "../../lists/forms/edit-list-form/EditListFormModal";
import DeleteListItemFormModal from "../../lists/forms/remove-list-items-form/RemoveListItemFormModal";
import ToggleListItemFormModal from "../../lists/forms/toggle-list-item-form/ToggleListItemFormModal";
import DeleteReviewFormModal from "../../reviews/form/delete-review/DeleteReviewFormModal";
import ReviewFormModal from "../../reviews/form/review-form/ReviewFormModal";
import SearchModal from "../../search/SearchDialog";

export default () => {
  return (
    <React.Fragment>
      <AuthPopups />
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
