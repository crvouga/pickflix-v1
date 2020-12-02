export type IModal = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export type ModalName =
  | "AddListItemForm"
  | "DeleteListItemsForm"
  | "CreateListForm"
  | "CreateListWithListItemsForm"
  | "ReviewForm"
  | "DeleteReviewForm"
  | "EditListForm"
  | "DeleteListForm"
  | "DiscoverSort"
  | "DiscoverSearch"
  | "DiscoverTune"
  | "Search"
  | "ToggleForm"
  | "EditUserForm"
  | "CurrentUserActions"
  | "RemoveListItemsForm"
  | "SignInCallToAction";

export type ModalStateType = "redux" | "location";
