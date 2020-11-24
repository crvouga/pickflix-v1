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
  | "ToggleListItemForm"
  | "EditUserForm"
  | "CurrentUserActions"
  | "RemoveListItemsForm";

export type ModalStateType = "redux" | "location";
