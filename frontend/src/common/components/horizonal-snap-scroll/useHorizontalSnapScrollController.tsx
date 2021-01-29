import { useTheme } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";

export interface IController {
  scrollLeft: () => void;
  scrollRight: () => void;
  leftDisabled: boolean;
  rightDisabled: boolean;
  reset: () => void;
  ref: React.MutableRefObject<HTMLDivElement | null>;
}

export const useHorizontalSnapScrollController = (): IController => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [leftDisabled, setLeftDisabled] = useState(true);
  const [rightDisabled, setRightDisabled] = useState(true);

  const theme = useTheme();

  const updatedDisabled = (nextLeft: number) => {
    if (ref.current) {
      setLeftDisabled(nextLeft === 0);

      setRightDisabled(
        ref.current.scrollWidth <= ref.current.getBoundingClientRect().width
      );
    }
  };

  const scrollLeft = () => {
    if (ref.current) {
      const left = Math.max(
        0,
        ref.current.scrollLeft -
          (ref.current.getBoundingClientRect().width + theme.spacing(2))
      );

      ref.current.scroll({
        left,
        behavior: "smooth",
      });

      updatedDisabled(left);
    }
  };

  const scrollRight = () => {
    if (ref.current) {
      const left =
        ref.current.scrollLeft +
        ref.current.getBoundingClientRect().width +
        theme.spacing(2);
      ref.current.scroll({
        left,

        behavior: "smooth",
      });
      updatedDisabled(left);
    }
  };

  useEffect(() => {
    updatedDisabled(0);
  }, []);

  const reset = () => {
    if (ref.current) {
      const left = 0;
      ref.current.scroll({
        left,
        behavior: "smooth",
      });
      updatedDisabled(left);
    }
  };

  return {
    reset,
    scrollRight,
    scrollLeft,
    leftDisabled,
    rightDisabled,
    ref,
  };
};
