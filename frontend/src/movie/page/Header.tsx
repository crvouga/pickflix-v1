import { Box, Chip, Divider, Typography } from "@material-ui/core";
import moment from "moment";
import "moment-duration-format";
import * as R from "ramda";
import React from "react";
import { useDispatch } from "react-redux";
import ExpandHeight from "../../common/components/ExpandHeight";
import HorizontalScroll from "../../common/components/HorizontalScroll";
import useBoolean from "../../common/hooks/useBoolean";
import discover from "../../discover/redux";
import { actions } from "../../redux";
import ActionBar from "./ActionBar";
import { MovieDetails, MovieReleaseDates, MovieGenre } from "../../tmdb/types";
import { makeTag } from "../../discover/redux/types";

const toCertification = (releaseDates: MovieReleaseDates) =>
  releaseDates.results
    .find((_) => _.iso31661 === "US")
    ?.releaseDates.map((_) => _.certification)
    .find((_) => _.length !== 0);

interface Props {
  details: MovieDetails;
  releaseDates: MovieReleaseDates;
}

const toSubtitle1 = ({ details, releaseDates }: Props) =>
  [
    details.releaseDate && moment(details.releaseDate).format("Y"),
    details.runtime &&
      moment.duration(details.runtime, "minutes").format("h[h] m[m]"),
    toCertification(releaseDates),
  ]
    .filter((_) => _)
    .join(" • ");

export default ({ details, releaseDates }: Props) => {
  const isOverviewExpanded = useBoolean();
  const subtitle1 = toSubtitle1({ details, releaseDates });

  const dispatch = useDispatch();

  const handleGenreClick = (genre: MovieGenre) => () => {
    dispatch(actions.router.push({ pathname: "/discover" }));
    dispatch(discover.actions.activateTags([genre].map(makeTag("genre"))));
  };

  return (
    <React.Fragment>
      <Box paddingX={2} paddingTop={2}>
        <Typography align="left" variant="h5" style={{ flex: 1 }}>
          {details.title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {subtitle1}
        </Typography>
      </Box>
      <HorizontalScroll paddingLeft={2} paddingY={1}>
        {details.genres.map((genre) => (
          <Box key={genre.id} marginRight={1}>
            <Chip
              label={genre.name}
              clickable
              variant="outlined"
              onClick={handleGenreClick(genre)}
            />
          </Box>
        ))}
      </HorizontalScroll>

      <Box paddingX={2}>
        <ActionBar />
      </Box>

      {/* <Box p={2} paddingTop={0} flexDirection="column" display="flex">
        {details.tagline !== details.overview && (
          <Typography align="center" style={{ fontWeight: "bold" }}>
            {details.tagline}
          </Typography>
        )}
        {details.overview && (
          <ExpandHeight
            collapsedHeight="7.5em"
            in={isOverviewExpanded.value}
            onClick={isOverviewExpanded.toggle}
          >
            <Typography variant="body1" color="textSecondary">
              {details.overview}
            </Typography>
          </ExpandHeight>
        )}
      </Box> */}
      <Divider />
    </React.Fragment>
  );
};
