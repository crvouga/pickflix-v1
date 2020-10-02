import {
  Collapse,
  CollapseProps,
  Typography,
  TypographyProps,
  Fade,
  Grow,
} from "@material-ui/core";
import React, { useEffect } from "react";
import useBoolean from "../hooks/useBoolean";

type Props = {
  isWrapped: boolean;
  collapsedHeight: string;
  CollapseProps?: CollapseProps;
} & TypographyProps;

const timeout = (CollapseProps: CollapseProps): number => {
  if (typeof CollapseProps.timeout === "number") {
    return CollapseProps.timeout;
  } else {
    return 1000 / 5;
  }
};

export default (props: Props) => {
  const {
    collapsedHeight,
    isWrapped,
    CollapseProps,

    ...TypographyProps
  } = props;

  const collapsed = useBoolean(isWrapped);
  const noWrap = useBoolean(!isWrapped);

  useEffect(() => {
    if (isWrapped) {
      noWrap.setFalse();
      collapsed.setTrue();
    } else {
      collapsed.setFalse();
      setTimeout(noWrap.setTrue, timeout(CollapseProps || {}));
    }
  }, [isWrapped, noWrap.value]);

  return (
    <Collapse
      {...CollapseProps}
      collapsedHeight="12em"
      timeout={timeout(CollapseProps || {})}
      in={collapsed.value}
    >
      <Typography {...TypographyProps} noWrap={noWrap.value} />
    </Collapse>
  );
};
