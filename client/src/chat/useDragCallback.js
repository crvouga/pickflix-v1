import { useState } from "react";

export default ({ onDragUp }) => {
  const [touching, setTouching] = useState(false);
  const [previousScrollTop, setPreviousScrollTop] = useState(0);

  const handleScroll = (e) => {
    const newScrollTop = e.currentTarget.scrollTop;
    if (previousScrollTop > newScrollTop) {
      // console.log("scroll up");
      if (touching) {
        // console.log("drag up");
        onDragUp(e);
      }
    } else {
      // console.log("scroll down");
    }
    setPreviousScrollTop(newScrollTop);
  };

  const handleTouchStart = () => {
    setTouching(true);
  };

  const handleTouchEnd = () => {
    setTouching(false);
  };

  return {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    onScroll: handleScroll,
  };
};
