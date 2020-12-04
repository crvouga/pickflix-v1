import React from "react";
import CreateListFormModal from "../../list/forms/create-list-form/CreateListFormModal";
import CreateListWithListItemsFormModal from "../../list/forms/create-list-with-list-items-form/CreateListWithListItemsFormModal";
import DeleteReviewFormModal from "../../review/form/delete-review/DeleteReviewFormModal";
import ReviewFormModal from "../../review/form/edit-create-review/ReviewFormModal";
import SearchModal from "../../search/SearchDialog";
import AuthPopups from "../../user/auth/AuthPopups";
import SignInCallToActionModal from "../../user/auth/SignInCallToActionModal";
import { CurrentUserActionsModal } from "../../user/CurrentUserActions";
import EditUserFormModal from "../../user/forms/edit-user-form/EditUserFormModal";
import SignOutFormModal from "../../user/forms/SignOutFormModal";

export default () => {
  return (
    <React.Fragment>
      <SignOutFormModal />
      <AuthPopups />
      <CreateListFormModal />
      <CreateListWithListItemsFormModal />
      <DeleteReviewFormModal />
      <ReviewFormModal />
      <SearchModal />
      <EditUserFormModal />
      <CurrentUserActionsModal />
      <SignInCallToActionModal />
    </React.Fragment>
  );
};
