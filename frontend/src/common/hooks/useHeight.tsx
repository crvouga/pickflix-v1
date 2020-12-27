import React, { useState, useLayoutEffect } from "react";

export default <T extends { clientHeight: number }>(
  ref: React.MutableRefObject<T>,
  defaultHeight: number = 0
) => {
  const [height, setHeight] = useState(defaultHeight);

  useLayoutEffect(() => {
    if (ref.current) {
      setHeight(ref.current.clientHeight);
    }
  }, [ref.current]);

  return height;
};
