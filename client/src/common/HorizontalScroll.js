import React from "react";

export default (props) => (
  <div
    {...props}
    style={{
      ...props.style,
      display: "flex",
      flexWrap: "nowrap",
      overflowX: "scroll",
      transform: "translateZ(0)",
    }}
  />
);
