//SOURCE: https://stackoverflow.com/questions/56024398/disable-double-tap-zoom-resize-on-safari-ios12

import { useEffect } from "react";

export default () => {
  useEffect(() => {
    document.body.setAttribute("style", "touch-action: pan-y;");

    const handleClick = (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
    };

    const handleTouch = (event: TouchEvent) => {
      if (event.touches.length > 1) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("touchstart", handleTouch, {
      passive: false,
    });
    return () => {
      document.body.removeAttribute("style");
      document.removeEventListener("click", handleClick);
      document.removeEventListener("touchstart", handleTouch);
    };
  }, []);
};
