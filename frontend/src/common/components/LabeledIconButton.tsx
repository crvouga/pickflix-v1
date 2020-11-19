import {
  Box,
  ButtonBase,
  ButtonBaseProps,
  makeStyles,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import React, { ReactNode } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(1),
    flex: 1,
    color: ({ disabled }: { disabled?: boolean }) =>
      disabled ? theme.palette.action.disabled : theme.palette.action.active,
  },
}));

export type LabeledIconButtonProps = ButtonBaseProps & {
  icon: ReactNode;
  label: string;
};

export default ({
  label,
  icon,
  disabled,
  ...props
}: LabeledIconButtonProps) => {
  const classes = useStyles({ disabled });
  return (
    <ButtonBase
      {...props}
      disabled={disabled}
      className={clsx(classes.root, props.className)}
    >
      <Box color="inherit">{icon}</Box>
      <Typography color="inherit" variant="subtitle2">
        {label}
      </Typography>
    </ButtonBase>
  );
};
