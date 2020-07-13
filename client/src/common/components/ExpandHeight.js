import { Collapse, makeStyles } from "@material-ui/core";
import React, { useRef } from "react";
import clsx from "clsx";
import units from "units-css";

const useStyles = makeStyles({
  fadeBottom: {
    "mask-image": "linear-gradient(to bottom, black 50%, transparent 100%)",
  },
});

export default ({ collapsedHeight, children, ...props }) => {
  const classes = useStyles();
  const ref = useRef();

  const childHeight = ref.current?.offsetHeight || 0;
  const collapsedHeightPixels = units.convert(
    "px",
    collapsedHeight,
    document.body
  );

  const minHeight = Math.min(collapsedHeightPixels, childHeight);
  const isFadeBottom = !props.in && childHeight > minHeight;

  return (
    <div
      className={clsx({
        [classes.fadeBottom]: isFadeBottom,
      })}
    >
      <Collapse collapsedHeight={minHeight} {...props}>
        <div ref={ref}>{children}</div>
      </Collapse>
    </div>
  );
};
