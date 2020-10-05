import { Box, BoxProps, makeStyles } from "@material-ui/core";
import React from "react";
import makeTMDbImageURL from "../../tmdb/makeTMDbImageURL";

type Props = {
  backdropPath: string;
} & BoxProps;

const useStyles = makeStyles({
  root: {
    position: "sticky",
    top: 0,
    left: 0,
    width: "100%",
    height: 0,
    paddingTop: "56.25%",
    backgroundImage: ({ backdropPath }: { backdropPath: string }) =>
      `url(${makeTMDbImageURL(3, { backdropPath })})`,
    backgroundOrigin: "center",
    backgroundSize: "cover",
    zIndex: -1,
  },
});

export default ({ backdropPath, ...props }: Props) => {
  const classes = useStyles({ backdropPath });
  return <Box className={classes.root} {...props} />;
};
