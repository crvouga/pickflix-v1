import {
  Box,
  makeStyles,
  Typography,
  TypographyVariant,
} from "@material-ui/core";
import "moment-duration-format";
import React from "react";
import AspectRatio from "../common/components/AspectRatio";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import { MovieDetails, MovieReleaseDates } from "../tmdb/types";
import { makeFadeToBackgroundCss } from "../utils";
import * as utils from "./utils";

type Props = {
  details: MovieDetails;
  releaseDates: MovieReleaseDates;
};

const titleToVariant = (title: string): TypographyVariant => {
  if (title.length < 24) return "h4";
  if (title.length < 36) return "h5";
  return "h6";
};

const useStyles = makeStyles((theme) => ({
  backgroundGradient: {
    background: makeFadeToBackgroundCss(theme, [0, 0, 0, 0.5, 0.9, 1]),
  },
  backgroundPicture: {
    position: "fixed",
    zIndex: -1,
    top: 0,
    left: 0,
    width: "100%",
    backgroundImage: ({ details }: Props) =>
      `url(${makeTMDbImageURL(
        4,
        details.backdropPath
          ? { backdropPath: details.backdropPath }
          : { posterPath: details.posterPath }
      )})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
  },
}));

const ratio: [number, number] = [4, 3];

export default (props: Props) => {
  const { details } = props;

  const classes = useStyles(props);

  return (
    <React.Fragment>
      <AspectRatio
        ratio={ratio}
        ContainerProps={{ className: classes.backgroundPicture }}
      />

      <AspectRatio
        ratio={ratio}
        ContentProps={{
          className: classes.backgroundGradient,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box flex={1}></Box>
        <Box textAlign="center" paddingX={2}>
          <Typography
            style={{ fontWeight: "bold" }}
            variant={titleToVariant(details.title)}
          >
            {details.title}
          </Typography>
          <Typography
            gutterBottom
            style={{ fontWeight: "bold" }}
            variant="subtitle1"
            color="textSecondary"
          >
            {[
              utils.rated(props),
              utils.releaseYear(props),
              utils.runtime(props),
            ].join(` ${utils.SMALL_DOT} `)}
          </Typography>
        </Box>
      </AspectRatio>
    </React.Fragment>
  );
};
