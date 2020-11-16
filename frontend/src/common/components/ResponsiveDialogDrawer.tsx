import React from "react";
import {
  ModalProps,
  useTheme,
  useMediaQuery,
  Drawer,
  Dialog,
  DialogProps,
  DrawerProps,
} from "@material-ui/core";
import { ZoomIn } from "./TransitionComponents";

type Props = ModalProps & {
  DialogProps?: DialogProps;
  DrawerProps?: DrawerProps;
};

export default ({ DialogProps, DrawerProps, ...props }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  if (isMobile) {
    return <Drawer anchor="bottom" {...props} {...DrawerProps} />;
  }

  return <Dialog TransitionComponent={ZoomIn} {...props} {...DialogProps} />;
};
