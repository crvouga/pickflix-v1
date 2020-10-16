import {
  IconButton,
  IconButtonProps,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";

const useStylesIconButton = makeStyles((theme) => ({
  root: {
    color: theme.palette.action.active,
  },
  label: {
    display: "flex",
    flexDirection: "column",
    fontSize: "0.5em",
  },
  disabled: {
    color: theme.palette.action.disabled,
  },
}));

type Props = IconButtonProps & {
  label: string;
};

export default ({ label, children, ...props }: Props) => {
  const classesIconButton = useStylesIconButton();

  return (
    <IconButton classes={classesIconButton} {...props}>
      {children}
      <Typography color="inherit" variant="subtitle2">
        {label}
      </Typography>
    </IconButton>
  );
};
