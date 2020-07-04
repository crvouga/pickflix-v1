/* 


SOURCE: https://usehooks.com/useDebounce/


*/
import React, { useState, useEffect, useRef } from "react";
export default function useDebounce(value, delay) {
  const ref = useRef();
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    clearTimeout(ref.current);

    ref.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(ref.current);
    };
  }, [value, delay]);

  return debouncedValue;
}
