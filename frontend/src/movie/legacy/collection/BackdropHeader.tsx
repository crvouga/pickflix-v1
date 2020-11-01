import { Box, BoxProps, makeStyles } from "@material-ui/core";
import React from "react";
import { useMakeImageUrl } from "../../../tmdb/makeTMDbImageURL";

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
    backgroundImage: ({ url }: { url?: string }) => `url(${url})`,
    backgroundOrigin: "center",
    backgroundSize: "cover",
    zIndex: -1,
  },
});

export default ({ backdropPath, ...props }: Props) => {
  const makeImageUrl = useMakeImageUrl();
  const classes = useStyles({ url: makeImageUrl(3, { backdropPath }) });
  return <Box className={classes.root} {...props} />;
};
