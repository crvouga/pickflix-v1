import {
  Box,
  BoxProps,
  makeStyles,
  TypographyVariant,
} from "@material-ui/core";
import React from "react";

type StyleProps = {
  scale: number;
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    transform: ({ scale }: StyleProps) => `scale(${scale})`,
    cursor: "pointer",
  },
  logo: {
    objectFit: "cover",
    objectPosition: "50% 50%",
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
        src={process.env.PUBLIC_URL + "/assets/logo.png"}
      />
    </Box>
  );
};
