import { BoxProps, makeStyles } from "@material-ui/core";
import React from "react";
import "react-lazy-load-image-component/src/effects/opacity.css";
import AspectRatio from "../../common/components/AspectRatio";
import { videoKeyToThumbnailURL } from "./query";

const useStyles = makeStyles((theme) => ({
  image: {
    width: "100%",
    height: "100%",
  },
}));

type Props = BoxProps & {
  videoId: string;
};

export const YoutubeThumbnail = ({ videoId, ...props }: Props) => {
  const src = videoKeyToThumbnailURL(videoId);
  const classes = useStyles();
  return (
    <AspectRatio ratio={[16, 9]} width="100%" height="100%" {...props}>
      <img className={classes.image} src={src} />
    </AspectRatio>
  );
};
