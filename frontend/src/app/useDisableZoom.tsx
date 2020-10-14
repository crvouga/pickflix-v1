//SOURCE: https://stackoverflow.com/questions/56024398/disable-double-tap-zoom-resize-on-safari-ios12

import { useEffect } from "react";

export default () => {
  useEffect(() => {
    document.body.setAttribute("style", "touch-action: pan-y;");

    document.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
    });

    document.addEventListener(
      "touchstart",
      (event) => {
        if (event.touches.length > 1) {
          event.preventDefault();
          event.stopPropagation();
        }
      },
      {
        passive: false,
      }
    );
    return () => {
      document.body.removeAttribute("style");
      document.removeEventListener("click", () => {});
      document.removeEventListener("touchstart", () => {});
    };
  }, []);
};
