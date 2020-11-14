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
  },
}));

export type LabeledIconButtonProps = ButtonBaseProps & {
  icon: ReactNode;
  label: string;
};

export default ({ label, icon, ...props }: LabeledIconButtonProps) => {
  const classes = useStyles();
  return (
    <ButtonBase {...props} className={clsx(classes.root, props.className)}>
      <Box>{icon}</Box>
      <Typography color="inherit" variant="subtitle2">
        {label}
      </Typography>
    </ButtonBase>
  );
};
