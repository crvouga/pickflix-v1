import { MediaId } from "../../media/tmdb/types";

export type Modals = {
  MovieVideo: void;
  MovieCredits: void;
  AddListItemForm: void;
  CreateListForm: void;
  CreateListWithListItemsForm: {
    mediaIds: MediaId[];
  };
  CurrentUserActions: void;
  DeleteListForm: void;
  DeleteListItemsForm: void;
  DeleteReviewForm: void;
  DiscoverSearch: void;
  DiscoverSort: void;
  DiscoverTune: void;
  EditListForm: void;
  EditUserForm: void;
  RemoveListItemsForm: void;
  ReviewForm: void;
  Search: void;
  ToggleListItemForm: void;
  SignInCallToAction: void;
  SignOutForm: void;
  PermissionForm: void;
  AddPermissionForm: void;
  MovieRelated: void;
  SaveDiscoverTagsForm: void;
  DiscoverTagsForm: void;
};

export type IModal<K extends keyof Modals> = {
  isOpen: boolean;
  props: Modals[K];
  open: (props: Modals[K]) => void;
  close: () => void;
};

export enum ModalStateType {
  Location = "Location",
  Redux = "Redux",
}

export const modalNameToModalStateType: {
  [modalName in keyof Modals]: ModalStateType;
} = {
  MovieVideo: ModalStateType.Location,
  MovieRelated: ModalStateType.Location,
  AddPermissionForm: ModalStateType.Location,
  PermissionForm: ModalStateType.Location,
  AddListItemForm: ModalStateType.Location,
  CreateListForm: ModalStateType.Redux,
  CreateListWithListItemsForm: ModalStateType.Redux,
  CurrentUserActions: ModalStateType.Redux,
  DeleteListForm: ModalStateType.Redux,
  DeleteListItemsForm: ModalStateType.Redux,
  DeleteReviewForm: ModalStateType.Redux,
  DiscoverSearch: ModalStateType.Location,
  DiscoverSort: ModalStateType.Location,
  DiscoverTune: ModalStateType.Location,
  EditListForm: ModalStateType.Redux,
  EditUserForm: ModalStateType.Location,
  RemoveListItemsForm: ModalStateType.Redux,
  ReviewForm: ModalStateType.Location,
  Search: ModalStateType.Location,
  ToggleListItemForm: ModalStateType.Location,
  SignInCallToAction: ModalStateType.Location,
  SignOutForm: ModalStateType.Redux,
  MovieCredits: ModalStateType.Location,
  SaveDiscoverTagsForm: ModalStateType.Location,
  DiscoverTagsForm: ModalStateType.Location,
};
