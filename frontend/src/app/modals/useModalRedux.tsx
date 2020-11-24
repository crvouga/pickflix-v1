import { useModalState } from "./redux/modal";
import { IModal, ModalName } from "./types";

export default (modalName: ModalName): IModal => {
  const modalState = useModalState();

  const isOpen = modalState.isOpen(modalName);

  const open = () => {
    modalState.open(modalName);
  };

  const close = () => {
    modalState.close(modalName);
  };

  return {
    isOpen,
    close,
    open,
  };
};
