import { Collapse, makeStyles } from "@material-ui/core";
import React, { useRef } from "react";
import clsx from "clsx";
import units from "units-css";

const useStyles = makeStyles({
  fadeBottom: {
    "mask-image": "linear-gradient(to bottom, black 50%, transparent 100%)",
  },
});

const toPixels = (_) => units.convert("px", _, document.body);

export default ({ collapsedHeight, children, ...props }) => {
  const classes = useStyles();
  const ref = useRef();

  const collapsedHeightPixels = toPixels(collapsedHeight);
  const childHeight = ref.current?.offsetHeight || collapsedHeightPixels;
  const minHeight = Math.min(collapsedHeightPixels, childHeight);
  const isFadeBottom = (!props.in && childHeight > minHeight) || !ref.current;
  const isIn = childHeight > minHeight && props.in;

  return (
    <div
      className={clsx({
        [classes.fadeBottom]: isFadeBottom,
      })}
    >
      <Collapse collapsedHeight={minHeight} {...props} in={isIn}>
        <div ref={ref}>{children}</div>
      </Collapse>
    </div>
  );
};
