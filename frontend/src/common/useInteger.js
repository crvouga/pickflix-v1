import { useState, useCallback } from "react";

export default (initialInteger) => {
  const [integer, setInteger] = useState(initialInteger);

  const set = useCallback(setInteger, [setInteger]);
  const add = useCallback((n) => setInteger((_) => _ + n), [setInteger]);
  const subtract = useCallback((n) => setInteger((_) => _ - n), [setInteger]);

  return {
    value: integer,
    add,
    subtract,
    set,
  };
};
