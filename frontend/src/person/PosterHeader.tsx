import { Box, makeStyles } from "@material-ui/core";
import * as R from "ramda";
import React from "react";
import AspectRatio from "../common/components/AspectRatio";
import { POSTER_ASPECT_RATIO } from "../movie/components/MoviePosterCard";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import {
  PersonDetailsResponse,
  PersonMovieCreditsResponse,
} from "../tmdb/types";
import * as utils from "./utils";

interface Props {
  details: PersonDetailsResponse;
  credits: PersonMovieCreditsResponse;
}

const useStyles = makeStyles((theme) => ({
  backgroundGradient: {},
}));

const counts = [8, 6, 4, 2];
const countToWidth: { [key: number]: string } = {
  8: "25%",
  6: "33.333%",
  4: "50%",
  2: "50%",
};
const countToSizeIndex: { [key: number]: number } = {
  8: 2,
  6: 3,
  4: 5,
  2: 6,
};

export default (props: Props) => {
  const classes = useStyles();

  const posters = R.uniqBy(
    (_) => _.id,
    utils.knownForMovies(props).filter((_) => _.posterPath)
  );
  const count = counts.find((count) => count <= posters.length) || 1;
  const width = countToWidth[count] || "100%";
  const sizeIndex = countToSizeIndex[count] || Infinity;

  const ratio: [number, number] = [
    POSTER_ASPECT_RATIO[0] * 3,
    POSTER_ASPECT_RATIO[1],
  ];
  return (
    <AspectRatio
      ratio={ratio}
      ContentProps={{
        className: classes.backgroundGradient,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      {posters.slice(0, count).map(({ id, posterPath }) => (
        <Box key={id} width={width}>
          <AspectRatio ratio={POSTER_ASPECT_RATIO}>
            <img
              src={makeTMDbImageURL(sizeIndex, { posterPath })}
              width="100%"
              height="100%"
            />
          </AspectRatio>
        </Box>
      ))}
    </AspectRatio>
  );
};
