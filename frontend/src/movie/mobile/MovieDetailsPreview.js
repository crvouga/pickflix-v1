import * as R from "ramda";
import { Typography } from "@material-ui/core";
import React from "react";
import * as utils from "../../utils";

export default ({ details }) => {
  const title = details.title;

  const subtitle1 = [
    details.releaseDate && utils.releaseDateToYear(details.releaseDate),
    details.runtime && utils.minutesToHoursAndMinutes(details.runtime),
    details.voteCount > 0 && `${details.voteAverage}/10 ★`,
    details.status !== "Released" && details.status,
  ]
    .filter(R.identity)
    .join(" • ");

  const subtitle2 = R.pipe(
    R.propOr([], "genres"),
    R.pluck("name"),
    R.join(" • ")
  )(details);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography align="left" variant="h5" style={{ flex: 1 }}>
        {title}
      </Typography>

      <Typography variant="subtitle1" color="textSecondary">
        {subtitle1}
      </Typography>

      <Typography
        style={{ fontStyle: "italic" }}
        variant="subtitle2"
        color="textSecondary"
      >
        {subtitle2}
      </Typography>
    </div>
  );
};
