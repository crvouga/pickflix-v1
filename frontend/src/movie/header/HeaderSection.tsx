import {
  Box,
  makeStyles,
  Typography,
  TypographyVariant,
} from "@material-ui/core";
import "moment-duration-format";
import React from "react";
import AspectRatio from "../../common/components/AspectRatio";
import makeTMDbImageURL from "../../tmdb/makeTMDbImageURL";
import { makeFadeToBackgroundCss } from "../../utils";
import { MoviePageData, useMoviePageQuery } from "../data";
import * as utils from "../utils";

// TODO: make better
const titleToVariant = (title: string): TypographyVariant => {
  const wordCount = title.split(" ").length;
  const maxWordLength = title
    .split(" ")
    .map((_) => _.length)
    .reduce(
      (maxWordLength, wordLength) => Math.max(maxWordLength, wordLength),
      0
    );

  if (maxWordLength < 18) return "h4";
  if (maxWordLength < 36) return "h5";
  return "h6";
};

type StyleProps = {
  backdropPath?: string;
  posterPath?: string;
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

    backgroundImage: ({ backdropPath, posterPath }: StyleProps) =>
      `url(${makeTMDbImageURL(
        4,
        backdropPath ? { backdropPath } : { posterPath }
      )})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
  },
}));

export const HEADER_ASPECT_RATIO: [number, number] = [4, 3];

const toSubtitle1 = (data: MoviePageData) =>
  [utils.rated(data), utils.releaseYear(data), utils.runtime(data)].join(
    ` ${utils.SMALL_DOT} `
  );

export default () => {
  const { data } = useMoviePageQuery();
  const classes = useStyles(data);

  if (!data) {
    return null;
  }

  return (
    <React.Fragment>
      <AspectRatio
        ratio={HEADER_ASPECT_RATIO}
        ContainerProps={{ className: classes.backgroundPicture }}
      />

      <AspectRatio
        ratio={HEADER_ASPECT_RATIO}
        ContentProps={{
          className: classes.backgroundGradient,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box flex={1}></Box>
        <Box textAlign="center" paddingX={2} maxWidth="100vw">
          <Typography variant={titleToVariant(data.title)}>
            {data.title}
          </Typography>
          <Typography gutterBottom variant="subtitle1" color="textSecondary">
            {toSubtitle1(data)}
          </Typography>
        </Box>
      </AspectRatio>
    </React.Fragment>
  );
};
