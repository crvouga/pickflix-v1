import { makeStyles } from "@material-ui/core";
import React from "react";
import * as youtubeAPI from "./api";
import AspectRatio from "../common/components/AspectRatio";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
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
    <AspectRatio ratio={[16, 9]} {...props}>
      <img className={classes.image} src={src} />
    </AspectRatio>
  );
};
