import { Drawer, useTheme } from "@material-ui/core";
import * as R from "ramda";
import React, { useEffect } from "react";

const getElementBottom = (DOMquery) =>
  document.querySelector(DOMquery)?.getBoundingClientRect?.()?.bottom || 0;

export default (props) => {
  const theme = useTheme();

  useEffect(() => {
    if (props.open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [props.open]);

  const PaperProps = R.mergeDeepLeft(props.PaperProps, {
    style: {
      backgroundColor: theme.palette.background.default,
      top: getBottom("#player"),
    },
  });

  const ModalProps = R.mergeDeepLeft(props.ModalProps, {
    keepMounted: true,
  });

  return (
    <Drawer
      variant="persistent"
      anchor="bottom"
      {...props}
      ModalProps={ModalProps}
      PaperProps={PaperProps}
    />
  );
};
