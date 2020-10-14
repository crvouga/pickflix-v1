import { Card, makeStyles } from "@material-ui/core";
import React from "react";
import AspectRatio from "../../common/components/AspectRatio";
import { MOVIE_POSTER_ASPECT_RATIO } from "./MoviePosterCard";

const useStyles = makeStyles((theme) => ({
  borderRadius: {
    borderRadius: theme.spacing(1 / 2),
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <Card className={classes.borderRadius}>
      <AspectRatio
        ratio={MOVIE_POSTER_ASPECT_RATIO}
        ContainerProps={{
          style: { position: "relative", width: "100%" },
        }}
      />
    </Card>
  );
};
