import { useEffect, useState } from "react";

enum KeyCode {
  ArrowDown = 40,
  ArrowUp = 38,
  Enter = 13,
  Escape = 27,
}

const circularIndex = (i: number, n: number) => ((i % n) + n) % n;

export default ({
  maxIndex,
  onEscape,
  onEnter,
}: {
  maxIndex: number;
  onEscape: (index: number) => void;
  onEnter: (index: number) => void;
}) => {
  const [index, setIndex] = useState(0);

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.keyCode) {
      case KeyCode.ArrowDown:
        setIndex((index) => circularIndex(index + 1, maxIndex));
        break;

      case KeyCode.ArrowUp:
        setIndex((index) => circularIndex(index - 1, maxIndex));
        break;

      case KeyCode.Escape:
        onEscape(index);
        break;

      case KeyCode.Enter:
        onEnter(index);
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return {
    index,
  };
};
