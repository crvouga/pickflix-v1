import * as R from "ramda";
import { useHistory } from "react-router";

export default () => {
  const history = useHistory();

  const pushState = (name, newModalState) => {
    const currentState = history.location.state || {};
    const newState = { modal: { [name]: newModalState || {} } };
    const nextState = R.mergeDeepLeft(newState, currentState);
    history.push({
      state: nextState,
    });
  };

  const open = (name, props = {}) => {
    pushState(name, { isOpen: true, props });
  };

  const close = (name) => {
    console.log({ name });
    pushState(name, { isOpen: false });
  };

  const isOpen = (name) =>
    history.location.state?.modal?.[name]?.isOpen || false;

  const getProps = (name) => history.location.state?.modal?.[name]?.props || {};
  return {
    getProps,
    isOpen,
    open,
    close,
  };
};
