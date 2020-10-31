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

type Props = ButtonBaseProps & {
  icon: ReactNode;
  label: string;
};

export default ({ label, icon, ...props }: Props) => {
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
