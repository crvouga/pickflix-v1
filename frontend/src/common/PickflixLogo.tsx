import { Box, BoxProps, makeStyles } from "@material-ui/core";
import React from "react";
import logo from "../logo.png"

type StyleProps = {
  scale: number;
};

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    transform: ({ scale }: StyleProps) => `scale(${scale})`,
    cursor: "pointer",
  },
  logo: {
    height: 36,
    width: 36 * 3,
  },
}));

type Props = BoxProps & {
  scale?: number;
};

export default ({ scale = 1, ...props }: Props) => {
  const classes = useStyles({ scale });

  return (
    <Box className={classes.root} {...props}>
      <img
        className={classes.logo}
        src={logo}
      />
    </Box>
  );
};
