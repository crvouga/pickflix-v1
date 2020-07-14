import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import AspectRatio from "react-aspect-ratio";
import "react-aspect-ratio/aspect-ratio.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import * as youtubeAPI from "./api";

const useStyles = makeStyles((theme) => ({
  image: {
    borderRadius: theme.spacing(1),
    width: "100%",
    height: "100%",
  },
}));

export default ({ video, ...props }) => {
  const src = youtubeAPI.videoKeyToThumbnailURL(video.key);
  const classes = useStyles();
  return (
    <Box component={AspectRatio} ratio="16/9" {...props}>
      <LazyLoadImage effect="opacity" className={classes.image} src={src} />
    </Box>
  );
};
