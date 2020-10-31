import { BoxProps, makeStyles } from "@material-ui/core";
import React from "react";
import "react-lazy-load-image-component/src/effects/opacity.css";
import AspectRatio from "../common/components/AspectRatio";
import { MovieVideo } from "../tmdb/types";
import { videoKeyToThumbnailURL } from "./query";

const useStyles = makeStyles((theme) => ({
  image: {
    width: "100%",
    height: "100%",
  },
}));

type Props = BoxProps & {
  video: MovieVideo;
};

export default ({ video, ...props }: Props) => {
  const src = videoKeyToThumbnailURL(video.key);
  const classes = useStyles();
  return (
    <AspectRatio ratio={[16, 9]} width="100%" height="100%" {...props}>
      <img className={classes.image} src={src} />
    </AspectRatio>
  );
};
