import { Box, Chip, Divider, Typography } from "@material-ui/core";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import * as R from "ramda";
import React from "react";
import { useDispatch } from "react-redux";
import ExpandHeight from "../../common/components/ExpandHeight";
import HorizontalScroll from "../../common/components/HorizontalScroll";
import useBoolean from "../../common/hooks/useBoolean";
import router from "../../common/redux/router";
import discover from "../../discover/redux";
import ActionBar from "./ActionBar";
momentDurationFormatSetup(moment);

const toCertification = R.pipe(
  R.propOr([], "results"),
  // [..., {..., iso31661, releaseDates}]
  R.find(R.whereEq({ iso31661: "US" })),
  // { iso31661: "US", releaseDates: [...] }
  R.propOr([], "releaseDates"),
  // [..., { ..., certification: "" | "G" | "PG" | ... }]
  R.pluck("certification"),
  // [..., certification]
  R.find(R.complement(R.isEmpty))
);

const toSubtitle1 = ({ details, releaseDates }) =>
  [
    details.releaseDate && moment(details.releaseDate).format("Y"),
    details.runtime &&
      moment.duration(details.runtime, "minutes").format("h[h] m[m]"),
    toCertification(releaseDates),
  ]
    .filter((_) => _)
    .join(" • ");

export default ({ details, releaseDates }) => {
  const isOverviewExpanded = useBoolean();
  const subtitle1 = toSubtitle1({ details, releaseDates });

  const dispatch = useDispatch();
  const handleGenreClick = (genre) => () => {
    dispatch(router.actions.push("/discover"));
    const newTags = R.map(R.assoc("type", "genre"), [genre]);
    dispatch(discover.actions.activateTags(newTags));
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

      <Box p={2} paddingTop={0} flexDirection="column" display="flex">
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
      </Box>
      <Divider />
    </React.Fragment>
  );
};
