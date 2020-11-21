import React from "react";
import AuthPopups from "../../user/auth/AuthPopups";
import CreateListFormModal from "../../list/forms/create-list-form/CreateListFormModal";
import CreateListWithListItemsFormModal from "../../list/forms/create-list-with-list-items-form/CreateListWithListItemsFormModal";
import DeleteListFormModal from "../../list/forms/delete-list-form/DeleteListFormModal";
import EditListFormModal from "../../list/forms/edit-list-form/EditListFormModal";
import DeleteListItemFormModal from "../../list/forms/remove-list-items-form/RemoveListItemFormModal";
import ToggleListItemFormModal from "../../list/forms/toggle-list-item-form/ToggleListItemFormModal";
import DeleteReviewFormModal from "../../review/form/delete-review/DeleteReviewFormModal";
import ReviewFormModal from "../../review/form/review-form/ReviewFormModal";
import SearchModal from "../../search/SearchDialog";

export default () => {
  return (
    <React.Fragment>
      <AuthPopups />
      <ToggleListItemFormModal />
      <EditListFormModal />
      <CreateListFormModal />
      <CreateListWithListItemsFormModal />
      <DeleteListFormModal />
      <DeleteListItemFormModal />
      <DeleteReviewFormModal />
      <ReviewFormModal />
      <SearchModal />
    </React.Fragment>
  );
};
