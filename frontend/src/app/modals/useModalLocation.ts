import { useHistory, useLocation } from "react-router";
import { IModal, Modals } from "./types";

export default <K extends keyof Modals>(modalName: K): IModal<K> => {
  const history = useHistory();
  const location = useLocation<
    {
      [key in keyof Modals]?: {
        isOpen: boolean;
        props: Modals[K];
      };
    }
  >();

  const isOpen = location?.state?.[modalName]?.isOpen || false;
  const props = location?.state?.[modalName]?.props as Modals[K];

  const open = (props: Modals[K]) => {
    history.push({
      state: {
        [modalName]: {
          isOpen: true,
          props: props,
        },
      },
    });
  };

  const close = () => {
    history.goBack();
  };

  return {
    isOpen,
    props,
    open,
    close,
  };
};
