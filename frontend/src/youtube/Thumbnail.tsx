import { Box, BoxProps, makeStyles } from "@material-ui/core";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import AspectRatio from "../common/components/AspectRatio";
import { MovieVideo } from "../tmdb/types";
import * as youtubeAPI from "./api";

const useStyles = makeStyles((theme) => ({
  image: {
    borderRadius: theme.spacing(1),
    width: "100%",
    height: "100%",
  },
}));

interface Props extends BoxProps {
  video: MovieVideo;
}

export default ({ video, ...props }: Props) => {
  const src = youtubeAPI.videoKeyToThumbnailURL(video.key);
  const classes = useStyles();
  return (
    <Box {...props}>
      <AspectRatio ratio={[16, 9]}>
        <LazyLoadImage effect="opacity" className={classes.image} src={src} />
      </AspectRatio>
    </Box>
  );
};
