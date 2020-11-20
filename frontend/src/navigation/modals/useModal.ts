import { useHistory, useLocation } from "react-router";

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
  | "ToggleListItemForm";

export default (modalName: ModalName) => {
  const history = useHistory();
  const location = useLocation<{ [key in ModalName]: boolean }>();

  const isOpen = location?.state?.[modalName] || false;

  const open = () => {
    history.push({
      state: {
        ...location.state,
        [modalName]: true,
      },
    });
  };

  const close = () => {
    history.replace({
      state: {
        ...location.state,
        [modalName]: false,
      },
    });
  };

  return {
    isOpen,
    open,
    close,
  };
};
