import { Collapse, makeStyles, CollapseProps } from "@material-ui/core";
import React, { useRef } from "react";
import clsx from "clsx";
import units from "units-css";

const useStyles = makeStyles({
  fadeBottom: {
    maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
  },
});

const toPixels = (_: string) => units.convert("px", _, document.body);

interface Props extends CollapseProps {
  collapsedHeight: string;
  onClick: () => void;
}

export default ({ collapsedHeight, onClick, children, ...props }: Props) => {
  const classes = useStyles();
  const ref = useRef<HTMLDivElement>(null);

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
      <Collapse
        collapsedHeight={minHeight}
        {...{ onClick }}
        in={isIn}
        {...props}
      >
        <div ref={ref}>{children}</div>
      </Collapse>
    </div>
  );
};
