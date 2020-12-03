import { useDispatch, useSelector } from "react-redux";
import { modal } from "./redux/modal";
import { IModal, Modals } from "./types";

export default <K extends keyof Modals>(name: K): IModal<K> => {
  const dispatch = useDispatch();

  const isOpen = useSelector(modal.selectors.isOpen(name));
  const props = useSelector(modal.selectors.props(name)) as Modals[K];

  const open = (props: Modals[K]) => {
    dispatch(modal.actions.open(name, props));
  };

  const close = () => {
    dispatch(modal.actions.close(name));
  };

  return {
    open,
    close,
    isOpen,
    props,
  };
};
