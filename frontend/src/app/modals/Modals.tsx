import React from "react";
import CreateListFormModal from "../../list/forms/create-list-form/CreateListFormModal";
import CreateListWithListItemsFormModal from "../../list/forms/create-list-with-list-items-form/CreateListWithListItemsFormModal";
import DeleteListFormModal from "../../list/forms/delete-list-form/DeleteListFormModal";
import EditListFormModal from "../../list/forms/edit-list-form/EditListFormModal";
import ToggleListItemFormModal from "../../list/forms/toggle-list-item-form/ToggleListItemFormModal";
import DeleteReviewFormModal from "../../review/form/delete-review/DeleteReviewFormModal";
import ReviewFormModal from "../../review/form/review-form/ReviewFormModal";
import SearchModal from "../../search/SearchDialog";
import AuthPopups from "../../user/auth/AuthPopups";
import { CurrentUserActionsModal } from "../../user/CurrentUserActions";
import EditUserFormModal from "../../user/forms/edit-user-form/EditUserFormModal";

export default () => {
  return (
    <React.Fragment>
      <AuthPopups />
      <ToggleListItemFormModal />
      <EditListFormModal />
      <CreateListFormModal />
      <CreateListWithListItemsFormModal />
      <DeleteListFormModal />
      <DeleteReviewFormModal />
      <ReviewFormModal />
      <SearchModal />
      <EditUserFormModal />
      <CurrentUserActionsModal />
    </React.Fragment>
  );
};