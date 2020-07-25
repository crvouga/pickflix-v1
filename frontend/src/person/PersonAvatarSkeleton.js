import { Box } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import AspectRatio from "react-aspect-ratio";
import "react-aspect-ratio/aspect-ratio.css";

export default (props) => {
  return (
    <AspectRatio ratio="1/1">
      <Skeleton variant="circle" width="100%" height="100%" />
    </AspectRatio>
  );
};
