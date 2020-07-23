import { Box, Divider, Typography } from "@material-ui/core";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import * as R from "ramda";
import React from "react";
import ChipScroll from "../../common/components/ChipScroll";
import ExpandHeight from "../../common/components/ExpandHeight";
import useBoolean from "../../common/hooks/useBoolean";
import ActionBar from "./ActionBar";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import discover from "../../discover/redux/discover";
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

  const history = useHistory();
  const dispatch = useDispatch();
  const handleChipClick = (chip) => {
    history.push("/discover");
    dispatch(discover.actions.setChips([R.assoc("type", "genre", chip)]));
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
      <ChipScroll
        chips={details.genres}
        getLabel={(_) => _.name}
        onChipClick={handleChipClick}
        BoxProps={{ paddingY: 1, paddingLeft: 2 }}
        ChipProps={{
          clickable: true,
        }}
      />
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
            collapsedHeight="10em"
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
