import { useState, useCallback } from "react";

const not = (x) => !x;

export default (initialState = false) => {
  const [boolean, setBoolean] = useState(initialState);

  const setFalse = () => setBoolean(false);
  const setTrue = () => setBoolean(true);
  const toggle = useCallback(() => setBoolean(not), [setBoolean]);

  return {
    value: boolean,
    setFalse,
    setTrue,
    toggle,
  };
};
