import { Box, makeStyles, Typography } from "@material-ui/core";
import moment from "moment";
import * as R from "ramda";
import React from "react";
import AspectRatio from "react-aspect-ratio";
import "react-aspect-ratio/aspect-ratio.css";
import AbsolutePositionBox from "../common/components/AbsolutePositionBox";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import PersonAvatar from "./PersonAvatar";

const toYear = (_) => moment(_).format("YYYY");

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

export default ({ images, taggedImages, details, credits }) => {
  const classes = useStyles();
  const allCredits = R.concat(credits.crew, credits.cast);

  const allMovies = R.uniqBy(R.prop("id"), allCredits);

  const [oldestMovie, newestMovie] = R.compose(
    R.juxt([R.head, R.last]),
    R.sortBy((_) => moment(_.releaseDate).format("YYYYMMDD")),
    R.reject(R.where({ releaseDate: R.isEmpty }))
  )(allMovies);

  const creditsByDepartment = R.groupBy(R.prop("department"), credits.crew);
  creditsByDepartment.Acting = credits.cast;

  const oldestRelease = toYear(oldestMovie?.releaseDate);
  const newestRelease = toYear(newestMovie?.releaseDate);
  const subtitle1 = [
    details.knownForDepartment,
    `${allMovies.length} movie${allMovies.length === 1 ? "" : "s"}`,
    `${oldestRelease} to ${newestRelease}`,
  ].join(" • ");

  return (
    <React.Fragment>
      {/* <AspectRatio ratio="21/9" className={classes.root}>
        <Box
          position="relative"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <AbsolutePositionBox
            style={{
              filter: "blur(16px)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundImage: `url(${makeTMDbImageURL(2, details)})`,
              maskImage:
                "linear-gradient(to bottom, black 50%, transparent 100%)",
            }}
          />

          <PersonAvatar person={details} width="144px" m="auto" />
        </Box>
      </AspectRatio> */}
      <Box textAlign="center" p={2}>
        <PersonAvatar person={details} width="144px" m="auto" />
      </Box>
      <Box paddingX={2}>
        <Typography variant="h5">{details.name}</Typography>

        <Typography variant="subtitle1" color="textSecondary">
          {subtitle1}
        </Typography>
      </Box>
    </React.Fragment>
  );
};
