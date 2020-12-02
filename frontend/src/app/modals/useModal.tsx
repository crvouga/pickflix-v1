import { IModal, ModalName, ModalStateType } from "./types";
import useModalLocation from "./useModalLocation";
import useModalRedux from "./useModalRedux";

const modalStateTypeByModalName: {
  [modalName in ModalName]: ModalStateType;
} = {
  AddListItemForm: "location",
  CreateListForm: "redux",
  CreateListWithListItemsForm: "redux",
  CurrentUserActions: "redux",
  DeleteListForm: "redux",
  DeleteListItemsForm: "redux",
  DeleteReviewForm: "redux",
  DiscoverSearch: "location",
  DiscoverSort: "location",
  DiscoverTune: "location",
  EditListForm: "redux",
  EditUserForm: "location",
  RemoveListItemsForm: "redux",
  ReviewForm: "location",
  Search: "location",
  ToggleForm: "location",
  SignInCallToAction: "location",
  SignOutForm: "redux",
};

export default (modalName: ModalName): IModal => {
  const location = useModalLocation(modalName);
  const redux = useModalRedux(modalName);

  const modalStateType = modalStateTypeByModalName[modalName];

  const modalStateByType = {
    location,
    redux,
  };

  const open = () => {
    modalStateByType[modalStateType].open();
  };

  const close = () => {
    modalStateByType[modalStateType].close();
  };

  const isOpen = modalStateByType[modalStateType].isOpen;

  return {
    open,
    close,
    isOpen,
  };
};
