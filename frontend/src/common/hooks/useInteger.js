import { useState, useCallback } from "react";

export default (initialInteger) => {
  const [integer, setInteger] = useState(initialInteger);

  const add = (n) => setInteger((_) => _ + n);
  const subtract = (n) => setInteger((_) => _ - n);

  return {
    value: integer,
    set: setInteger,
    add,
    subtract,
  };
};
