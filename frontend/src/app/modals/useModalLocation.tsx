import { useHistory, useLocation } from "react-router";
import { IModal, ModalName } from "./types";

export default (modalName: ModalName): IModal => {
  const history = useHistory();
  const location = useLocation<{ [key in ModalName]: boolean }>();

  const isOpen = location?.state?.[modalName] || false;

  const open = () => {
    history.push({
      state: {
        [modalName]: true,
      },
    });
  };

  const close = () => {
    history.goBack();
    // history.push({
    //   state: {
    //     [modalName]: false,
    //   },
    // });
  };

  return {
    isOpen,
    open,
    close,
  };
};
