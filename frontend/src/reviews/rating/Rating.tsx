import React from "react";
import { Rating, RatingProps } from "@material-ui/lab";

//SOURCE: https://github.com/mui-org/material-ui/blob/master/packages/material-ui-lab/src/Rating/Rating.js
export const RATING_COLOR = "#ffb400";

export default (props: RatingProps) => {
  return <Rating {...props} />;
};
