import {
  IModal,
  modalNameToModalStateType,
  Modals,
  ModalStateType,
} from "./types";
import useModalLocation from "./useModalLocation";
import useModalRedux from "./useModalRedux";

export default <K extends keyof Modals>(modalName: K): IModal<K> => {
  const location = useModalLocation(modalName);
  const redux = useModalRedux(modalName);

  const modalStateType = modalNameToModalStateType[modalName];

  const modalStateByType = {
    [ModalStateType.Location]: location,
    [ModalStateType.Redux]: redux,
  };

  const open = (props: Modals[K]) => {
    modalStateByType[modalStateType].open(props);
  };

  const close = () => {
    modalStateByType[modalStateType].close();
  };

  const isOpen = modalStateByType[modalStateType].isOpen;
  const props = modalStateByType[modalStateType].props;

  return {
    open,
    close,
    isOpen,
    props,
  };
};
